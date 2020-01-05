import React from "react"
import $ from "jquery"
import { connect } from "react-redux"
import {
	GetBootsrapStyle,
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
	MessagesPopup,
} from "../components"
import {
	getDataByLoginAction,
	changeStatusLoginAction,
	createNewUserAction,
	updateUserPassAction,
	resetPasswordAction,
	addNewSectionAction,
	addNewTagAction,
	addNewNoteAction,
	editSectionAction,
	editTagAction,
	editNoteAction,
	removeSectionAction,
	removeTagAction,
	removeNoteAction,
	handlerCurrentValueAction,
	handlerHeaderPopupAction,
	handlerValueFiltersAction,
	handlerLangAction,
	handlerThemeAction,
} from "../actions"
import { IAppProps } from "../types"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { ScaleLoader } from "react-spinners"
import { css } from "@emotion/core"
import "../styles/App.css"

import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"

// for ScaleLoader from "react-spinners"
const override = css`
	width: 50px;
	height: 50px;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
`

const App: React.FC<IAppProps> = props => {
	const {
		store,
		getDataByLoginToApp,
		changeStatusLoginToApp,
		createNewUserToApp,
		updateUserPassToApp,
		resetPasswordToApp,
		addNewSectionToApp,
		addNewTagToApp,
		addNewNoteToApp,
		editSectionToApp,
		editTagToApp,
		editNoteToApp,
		removeSectionToApp,
		removeTagToApp,
		removeNoteToApp,
		handlerCurrentValueToApp,
		handlerHeaderPopupToApp,
		handlerValueFiltersToApp,
		handlerLangToApp,
		handlerThemeToApp,
	} = props

	const {
		sections,
		tags,
		notes,
		filters,
		currentDetails,
		messagePopup,
		namePopup,
		auth,
		loading,
	} = store

	// https://stackoverflow.com/questions/49935614/extract-css-from-scss-and-deferred-lazy-load-in-react-app
	// https://stackoverflow.com/questions/55679111/webpack-4-create-multiple-theme-css-files?rq=1

	// подсчёт количества тегов или записей активной секции
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
						if (key === "sectionId" && tags[i][key] === nameFilter) {
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
						if (key === "sectionId" && notes[i][key] === nameFilter) {
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
						if (filters.sections === item.sectionId) {
							qqq = item.sectionId
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
						if (item.tagId === "0") {
							// Untagged
							qqq = item.tagId
						}
						return qqq
					})
					count = filteredNotes.length
				} else {
					const filteredNotes = notes.filter(item => {
						let qqq
						if (
							filters.sections === item.sectionId &&
							item.tagId === "0" // Untagged
						) {
							qqq = item.tagId
						}
						return qqq
					})

					count = filteredNotes.length
				}
			}
			// nameFilter !== "All" && !== "Untagged"
			else {
				for (let i = 0; i < notes.length; i++) {
					for (const key in notes[i]) {
						if (key === "tagId" && notes[i][key] === nameFilter) {
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
			id: string,
			sectionId: string,
			tagId?: string,
			userId: string,
		}>,
		filters: { sections: string, tags: string }
	): any => {
		// фильтрация массива notes[]
		if (typeArray === "notesArr") {
			// 1. получаем массив notes[] отфильтрованный по Section
			const notesFilterdBySection = arr.filter(item => {
				let qqq
				if (filters.sections === "All") qqq = arr
				else if (filters.sections === item.sectionId) {
					qqq = item.sectionId
				}
				return qqq
			})
			// 2. получаем массив notes[]
			// отфильтрованный и по Section, и по Tag
			const notesFilterdByTag = notesFilterdBySection.filter(item => {
				let qqq
				if (filters.tags === "All") {
					qqq = notesFilterdBySection
				} else if (filters.tags === "Untagged" && item.tagId === "0") {
					qqq = item.tagId
				} else if (filters.tags === item.tagId) {
					qqq = item.tagId
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
				else if (filters.sections === item.sectionId) {
					qqq = item.sectionId
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
	const getRemovableItemId = (namePopup: string): string => {
		let removableItemId = ""
		if (namePopup === "Section") {
			removableItemId = currentDetails.section.id
		} else if (namePopup === "Tag") {
			removableItemId = currentDetails.tag.id
		} else if (namePopup === "Note") {
			removableItemId = currentDetails.note.id
		}
		return removableItemId
	}

	return (
		<div className="App">
			<GetBootsrapStyle theme={currentDetails.userProfile.theme} />
			<div className="container-fluid app-user">
				<div className="row">
					<UserPanel
						auth={auth}
						changeStatusLogin={changeStatusLoginToApp}
						userProfile={currentDetails.userProfile}
						getDataByLogin={getDataByLoginToApp}
						handlerHeaderPopup={handlerHeaderPopupToApp}
						handlerLang={handlerLangToApp}
						handlerTheme={handlerThemeToApp}
					/>
				</div>
			</div>
			<div className="container-fluid app-header">
				<div className="row">
					<SectionsPanel
						sections={sections}
						lang={currentDetails.userProfile.lang}
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
							lang={currentDetails.userProfile.lang}
							filters={filters}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
							handlerValueFilters={handlerValueFiltersToApp}
							resetHighlightItem={resetHighlightItem}
							countQualityItems={countQualityItems}
						/>
					</nav>
					<main className="col-md-9 ml-sm-auto col-lg-9 px-4 app-content">
						<SearchPanel lang={currentDetails.userProfile.lang} />
						<StatisticInfoPanel
							sections={sections}
							filters={filters}
							countQualityItems={countQualityItems}
							lang={currentDetails.userProfile.lang}
						/>
						<ItemNotes
							tags={tags}
							lang={currentDetails.userProfile.lang}
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
				userProfile={currentDetails.userProfile}
			/>
			<AddNewSectionPopup
				auth={auth}
				addNewSection={addNewSectionToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				namePopup={namePopup}
				userProfile={currentDetails.userProfile}
			/>
			<AddNewTagPopup
				auth={auth}
				sections={sections}
				addNewTag={addNewTagToApp}
				namePopup={namePopup}
				userProfile={currentDetails.userProfile}
			/>
			<AddNewNotePopup
				auth={auth}
				tags={tags}
				addNewNote={addNewNoteToApp}
				namePopup={namePopup}
				userProfile={currentDetails.userProfile}
			/>
			<EditSectionPopup
				auth={auth}
				editSection={editSectionToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedSection={currentDetails.section}
				namePopup={namePopup}
				lang={currentDetails.userProfile.lang}
			/>
			<EditTagPopup
				auth={auth}
				sections={sections}
				editTag={editTagToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedTag={currentDetails.tag}
				namePopup={namePopup}
				lang={currentDetails.userProfile.lang}
			/>
			<EditNotePopup
				auth={auth}
				tags={tags}
				editNote={editNoteToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				currentEditedNote={currentDetails.note}
				namePopup={namePopup}
				lang={currentDetails.userProfile.lang}
			/>
			<RemoveItemPopup
				auth={auth}
				removeSection={removeSectionToApp}
				removeTag={removeTagToApp}
				removeNote={removeNoteToApp}
				handlerCurrentValue={handlerCurrentValueToApp}
				namePopup={namePopup}
				removableItemId={getRemovableItemId(namePopup)}
				resetHighlightItem={resetHighlightItem}
				lang={currentDetails.userProfile.lang}
			/>
			<UserPassResetPopup
				namePopup={namePopup}
				resetPassword={resetPasswordToApp}
				lang={currentDetails.userProfile.lang}
			/>
			<UserPassChangePopup
				namePopup={namePopup}
				userProfile={currentDetails.userProfile}
				updateUserPass={updateUserPassToApp}
			/>
			<MessagesPopup
				category={messagePopup.category}
				message={messagePopup.message}
			/>
			{/*
				https://www.npmjs.com/package/react-spinners
				https://www.react-spinners.com/
			*/}
			{loading ? (
				<div className="parent-loader">
					<ScaleLoader
						css={override}
						height={150}
						width={5}
						radius={25}
						color={"tomato"}
						loading={loading}
					/>
				</div>
			) : (
				""
			)}
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		getDataByLoginToApp: (objUser: { login: string, pass: string }) =>
			dispatch(getDataByLoginAction(objUser)),
		changeStatusLoginToApp: (token: string) =>
			dispatch(changeStatusLoginAction(token)),
		createNewUserToApp: (objUser: { login: string, pass: string }) =>
			dispatch(createNewUserAction(objUser)),
		updateUserPassToApp: (objUser: {
			inputOldPass: any,
			inputNewPass: any,
			token: string,
		}) => dispatch(updateUserPassAction(objUser)),
		resetPasswordToApp: (userLogin: any) =>
			dispatch(resetPasswordAction(userLogin)),
		handlerHeaderPopupToApp: (header: string) =>
			dispatch(handlerHeaderPopupAction(header)),
		handlerCurrentValueToApp: (name: string, value: string) =>
			dispatch(handlerCurrentValueAction(name, value)),
		handlerValueFiltersToApp: (filter: string, id: string) =>
			dispatch(handlerValueFiltersAction(filter, id)),
		handlerLangToApp: (lang: string) => dispatch(handlerLangAction(lang)),
		handlerThemeToApp: (theme: string) =>
			dispatch(handlerThemeAction(theme)),
		addNewSectionToApp: (newSection: {
			nameSection: string,
			userId: string,
		}) => dispatch(addNewSectionAction(newSection)),
		addNewTagToApp: (newTag: {
			nameTag: any,
			sectionId: any,
			userId: string,
		}) => dispatch(addNewTagAction(newTag)),
		addNewNoteToApp: (newNote: {
			header: string,
			text: string,
			remarks: string,
			link: string,
			sectionId: string,
			tagId: string,
			userId: string,
		}) => dispatch(addNewNoteAction(newNote)),
		editSectionToApp: (editedSection: {
			id: string,
			nameSection: string,
			userId: string,
		}) => dispatch(editSectionAction(editedSection)),
		editTagToApp: (editedTag: {
			id: string,
			nameTag: string,
			sectionId: string,
			userId: string,
		}) => dispatch(editTagAction(editedTag)),
		editNoteToApp: (editedNote: {
			id: string,
			header: string,
			text: string,
			remarks: string,
			link: string,
			sectionId: string,
			tagId: string,
			userId: string,
		}) => dispatch(editNoteAction(editedNote)),
		removeSectionToApp: (sectionId: string) =>
			dispatch(removeSectionAction(sectionId)),
		removeTagToApp: (tagId: string) => dispatch(removeTagAction(tagId)),
		removeNoteToApp: (noteId: string) => dispatch(removeNoteAction(noteId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
