import React from "react"
import $ from "jquery"
import { connect } from "react-redux"
import {
	UserPanel,
	SectionsPanel,
	SideBarTags,
	SearchPanel,
	StatisticInfoPanel,
	ItemNotes,
	AddNewUserPopup,
	AddNewSectionPopup,
	AddNewTagPopup,
	AddNewNotePopup,
	EditSectionPopup,
	EditTagPopup,
	EditNotePopup,
	RemoveItemPopup,
	UserPassResetPopup,
	UserPassChangePopup,
} from "../components"
import {
	getDataByLoginAction,
	getStatusLoginAction,
	createNewUserAction,
	addNewSectionAction,
	addNewTagAction,
	addNewNoteAction,
	editSectionAction,
	editTagAction,
	editNoteAction,
	removeItemAction,
	handlerCurrentValueAction,
	handlerHeaderPopupAction,
	handlerValueFiltersAction,
} from "../actions"
import { IAppProps } from "../types"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../styles/App.css"

const App: React.FC<IAppProps> = props => {
	const {
		store,
		getDataByLoginToApp,
		getStatusLoginToApp,
		createNewUserToApp,
		addNewSectionToApp,
		addNewTagToApp,
		addNewNoteToApp,
		editSectionToApp,
		editTagToApp,
		editNoteToApp,
		removeItemToApp,
		handlerCurrentValueToApp,
		handlerHeaderPopupToApp,
		handlerValueFiltersToApp,
	} = props

	const {
		sections,
		tags,
		notes,
		filters,
		currentDetails,
		namePopup,
		auth,
	} = store

	// получение количества тегов или записей активной секции
	const countQualityItems = (
		nameArray: string,
		nameFilter: string
	): number => {
		let count = 0
		if (nameArray === "statTags") {
			if (nameFilter === "All") {
				count = tags.length
			} else {
				// filterSection !== "All"
				for (let i = 0; i < tags.length; i++) {
					for (const key in tags[i]) {
						if (key === "sectionID" && tags[i][key] === nameFilter) {
							count += 1
						}
					}
				}
			}
		} else if (nameArray === "statNotes") {
			if (nameFilter === "All") {
				count = notes.length
			} else {
				// filterSection !== "All"
				for (let i = 0; i < notes.length; i++) {
					for (const key in notes[i]) {
						if (key === "sectionID" && notes[i][key] === nameFilter) {
							count += 1
						}
					}
				}
			}
		} else if (nameArray === "tagBarNotes") {
			if (nameFilter === "All") {
				// если фильтр секции "All"
				if (filters.sections === "All") {
					count = notes.length
				}
				// если фильтр секции !== "All"
				else {
					const filteredNotes = notes.filter(item => {
						let qqq
						if (filters.sections === item.sectionID) {
							qqq = item.sectionID
						}
						return qqq
					})
					// console.log(filteredNotes)
					count = filteredNotes.length
				}
			} else if (nameFilter === "Untagged") {
				if (filters.sections === "All") {
					const filteredNotes = notes.filter(item => {
						let qqq
						if (item.tagID === "Untagged") {
							qqq = item.tagID
						}
						return qqq
					})
					// console.log(filteredNotes)
					count = filteredNotes.length
				} else {
					const filteredNotes = notes.filter(item => {
						let qqq
						if (
							filters.sections === item.sectionID &&
							item.tagID === "Untagged"
						) {
							qqq = item.tagID
						}
						return qqq
					})
					// console.log(filteredNotes)
					count = filteredNotes.length
				}
			}
			// // nameFilter !== "All" && !== "Untagged"
			else {
				for (let i = 0; i < notes.length; i++) {
					for (const key in notes[i]) {
						if (key === "tagID" && notes[i][key] === nameFilter) {
							count += 1
						}
					}
				}
			}
		}
		return count
	}

	// получение отфильтрованных массивов notes[]/tags[]
	const getFiltredArray = (
		typeArray: string,
		arr: Array<{
			_id: string,
			sectionID: string,
			tagID?: string,
			userID: string,
		}>,
		filters: { sections: string, tags: string }
	): any => {
		// фильтрация массива notes[]
		if (typeArray === "notesArr") {
			// 1. получаем массив notes[] отфильтрованный по Section
			const notesFilterdBySection = arr.filter(item => {
				let qqq
				if (filters.sections === "All") qqq = arr
				else if (filters.sections === item.sectionID) {
					qqq = item.sectionID
				}
				return qqq
			})
			// 2. получаем массив notes[]
			// отфильтрованный и по Section, и по Tag
			const notesFilterdByTag = notesFilterdBySection.filter(item => {
				let qqq
				if (filters.tags === "All") {
					qqq = notesFilterdBySection
				} else if (filters.tags === item.tagID) {
					qqq = item.tagID
				}
				return qqq
			})
			return notesFilterdByTag
		}
		// фильтрация массива tags[]
		else if (typeArray === "tagsArr") {
			// console.log(typeArray, arr)
			const tagesFilterdBySection = arr.filter(item => {
				let qqq
				if (filters.sections === "All") qqq = arr
				else if (filters.sections === item.sectionID) {
					qqq = item.sectionID
				}
				return qqq
			})
			return tagesFilterdBySection
		}
	}

	// сброс подсветки у соседей и подсветка active section/tag
	const resetHighlightItem = (elem: any, nameElem: string): void => {
		// подсветка active section/tag
		if (nameElem === "") {
			const elems = $(elem)
				.parent()
				.parent()
				.children()
			// console.log(elem)
			for (let i = 0; i < elems.length; i++) {
				// удаляем все подсветки тегов
				$(elems[i]).removeClass("item-active")
			}
			$(elem)
				.parent()
				.addClass("item-active")
		}
		// сброс подсветки item "All" при remove/edit sections/tags
		else if (nameElem === "clearItems") {
			const elems = elem.children()
			for (let i = 0; i < elems.length; i++) {
				// удаляем все подсветки тегов/секций
				$(elems[i]).removeClass("item-active")
			}
			// если родитель elems содержит .nav-tabs
			if (
				$(elems)
					.parent()
					.hasClass("nav-tabs")
			) {
				// подсвечиваем первый элемент списка sections - item All
				$(elems[0]).addClass("item-active")
			}
			// если родитель elems НЕ содержит .nav-tabs
			else {
				// подсвечиваем второй элемент списка tags - item All
				$(elems[1]).addClass("item-active")
			}
		}
	}

	// функция получения значения id удаляемого Item (section/tag/note)
	const getRemovableItemID = (namePopup: string): string => {
		let removableItemID = ""
		if (namePopup === "Section") {
			removableItemID = currentDetails.section._id
		} else if (namePopup === "Tag") {
			removableItemID = currentDetails.tag._id
		} else if (namePopup === "Note") {
			removableItemID = currentDetails.note._id
		}
		return removableItemID
	}

	return (
		<div className="App">
			<div className="container-fluid app-user">
				<div className="row">
					<UserPanel
						auth={auth}
						login={currentDetails.userProfile.login}
						getStatusLogin={getStatusLoginToApp}
						getDataByLogin={getDataByLoginToApp}
						handlerHeaderPopup={handlerHeaderPopupToApp}
					/>
				</div>
			</div>
			<div className="container-fluid app-header">
				<div className="row">
					<SectionsPanel
						sections={sections}
						handlerHeaderPopup={handlerHeaderPopupToApp}
						handlerCurrentValue={handlerCurrentValueToApp}
						handlerValueFilters={handlerValueFiltersToApp}
						resetHighlightItem={resetHighlightItem}
					/>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<nav className="col-md-3 col-lg-3 d-none d-md-block app-side-tags fixed-top">
						<SideBarTags
							tags={getFiltredArray("tagsArr", tags, filters)}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
							handlerValueFilters={handlerValueFiltersToApp}
							resetHighlightItem={resetHighlightItem}
							countQualityItems={countQualityItems}
						/>
					</nav>
					<main className="col-md-9 ml-sm-auto col-lg-9 px-4 app-content">
						<SearchPanel />
						<StatisticInfoPanel
							sections={sections}
							filters={filters}
							countQualityItems={countQualityItems}
						/>
						<ItemNotes
							tags={tags}
							notes={getFiltredArray("notesArr", notes, filters)}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
						/>
					</main>
				</div>
			</div>
			<AddNewUserPopup
				createNewUser={createNewUserToApp}
				namePopup={namePopup}
			/>
			<AddNewSectionPopup
				addNewSection={addNewSectionToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				namePopup={namePopup}
			/>
			<AddNewTagPopup
				sections={sections}
				addNewTag={addNewTagToApp}
				namePopup={namePopup}
			/>
			<AddNewNotePopup
				tags={tags}
				sections={sections}
				addNewNote={addNewNoteToApp}
				namePopup={namePopup}
			/>
			<EditSectionPopup
				editSection={editSectionToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedSection={currentDetails.section}
				namePopup={namePopup}
			/>
			<EditTagPopup
				sections={sections}
				editTag={editTagToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedTag={currentDetails.tag}
				namePopup={namePopup}
			/>
			<EditNotePopup
				sections={sections}
				tags={tags}
				editNote={editNoteToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedNote={currentDetails.note}
				namePopup={namePopup}
			/>
			<RemoveItemPopup
				removeItem={removeItemToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				namePopup={namePopup}
				removableItemID={getRemovableItemID(namePopup)}
				resetHighlightItem={resetHighlightItem}
			/>
			<UserPassResetPopup namePopup={namePopup} />
			<UserPassChangePopup namePopup={namePopup} />
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		getDataByLoginToApp: (user: { login: any, pass: any }) =>
			dispatch(getDataByLoginAction(user)),
		getStatusLoginToApp: (token: string) =>
			dispatch(getStatusLoginAction(token)),
		handlerHeaderPopupToApp: (header: string) =>
			dispatch(handlerHeaderPopupAction(header)),
		handlerCurrentValueToApp: (name: string, value: string) =>
			dispatch(handlerCurrentValueAction(name, value)),
		handlerValueFiltersToApp: (filter: string, id: string) =>
			dispatch(handlerValueFiltersAction(filter, id)),
		createNewUserToApp: (objUser: { login: any, pass: any }) =>
			dispatch(createNewUserAction(objUser)),
		addNewSectionToApp: (value: string) =>
			dispatch(addNewSectionAction(value)),
		addNewTagToApp: (newTag: { nameTag: string, sectionID: string }) =>
			dispatch(addNewTagAction(newTag)),
		addNewNoteToApp: (newNote: {
			header: string,
			text: string,
			remarks: string,
			link: string,
			sectionID: string,
			tagID: string,
		}) => dispatch(addNewNoteAction(newNote)),
		editSectionToApp: (editedSection: { id: string, nameSection: string }) =>
			dispatch(editSectionAction(editedSection)),
		editTagToApp: (editedTag: {
			id: string,
			nameTag: string,
			sectionID: string,
		}) => dispatch(editTagAction(editedTag)),
		editNoteToApp: (editedNote: {
			id: string,
			header: string,
			text: string,
			remarks: string,
			link: string,
			sectionID: string,
			tagID: string,
		}) => dispatch(editNoteAction(editedNote)),
		removeItemToApp: (name: string, id: string) =>
			dispatch(removeItemAction(name, id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
