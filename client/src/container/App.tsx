import React from "react"
import $ from "jquery"
import { connect } from "react-redux"
import {
	UserPanel,
	SectionsPanel,
	SideBarTags,
	SearchPanel,
	StatisticInfoPanel,
	SwitcherTags,
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
	UserMobileAuthPopup,
	MessagesPopup,
	HelloPage,
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
import { getDataLocalStorage } from "../common"
import { IAppProps } from "../types"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { ScaleLoader } from "react-spinners"
import { css } from "@emotion/core"
import "../styles/App.sass"

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

	const { filters, messagePopup, namePopup, loading } = store
	let { sections, tags, notes, currentDetails, auth } = store

	// получаем данные из localStorage
	const dataLocalStorage = getDataLocalStorage()

	if (dataLocalStorage !== null) {
		auth = dataLocalStorage.auth
		currentDetails = dataLocalStorage.currentDetails
		sections = dataLocalStorage.sections
		tags = dataLocalStorage.tags
		notes = dataLocalStorage.notes
	}

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
			userId: string,
			tagId?: string,
			nameTag?: any,
			header?: any,
			text?: any,
			createdAt?: any,
			updatedAt?: any,
		}>,
		filters: { sections: string, tags: string },
		searchText?: any,
		searchSort?: any
	): any => {
		// фильтрация массива notes[]
		if (typeArray === "notesArr") {
			// если поисковая строка пустая
			if (searchText === "") {
				// 1. получаем массив notes[]
				// отфильтрованный по Section
				const notesFilteredBySection = arr.filter(item => {
					let qqq
					if (filters.sections === "All") qqq = arr
					else if (filters.sections === item.sectionId) {
						qqq = item.sectionId
					}
					return qqq
				})
				// 2. получаем массив notes[]
				// отфильтрованный и по Section, и по Tag
				const notesFilteredByTag = notesFilteredBySection.filter(item => {
					let qqq
					if (filters.tags === "All") {
						qqq = notesFilteredBySection
					} else if (filters.tags === "Untagged" && item.tagId === "0") {
						qqq = item.tagId
					} else if (filters.tags === item.tagId) {
						qqq = item.tagId
					}
					return qqq
				})
				// 3. получаем массив notes[]
				// отсортированный по убыванию даты обновления
				const notesSortedByDateUpdated = notesFilteredByTag.sort((a, b) => {
					if (a.updatedAt > b.updatedAt) {
						return -1
					}
					return 0
				})

				return notesSortedByDateUpdated
			}
			// если поисковая строка НЕ пустая
			else {
				// сортировка поиска по text`у
				if (searchSort === "text") {
					return arr.filter(item => {
						return item.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1
					})
				}
				// сортировка поиска по header`у
				else {
					return arr.filter(item => {
						return (
							item.header.toLowerCase().indexOf(searchText.toLowerCase()) > -1
						)
					})
				}
			}
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
			// получаем сортированный array tags[]
			const newArr = tagesFilterdBySection.sort((a, b) => {
				if (a.nameTag < b.nameTag) {
					return -1
				}
				return 0
			})

			return newArr
		}
	}

	const theme = currentDetails.userProfile.theme
	const widthDisplay = document.documentElement.clientWidth
	const heightDisplay = document.documentElement.clientHeight

	// сброс подсветки у соседей и подсветка active section/tag
	const resetHighlightItem = (
		clickedElem: any,
		elems: any,
		name: string
	): void => {
		if (name === "") {
			for (let i = 0; i < elems.length; i++) {
				// удаляем все подсветки тегов/секций
				$(elems[i]).removeClass(`item-active-night`)
				$(elems[i]).removeClass(`item-active-light`)
			}
			// подсветка active section/tag
			$(clickedElem)
				.parent()
				.addClass(`item-active-${theme}`)
		} else if (name === "clearItems") {
			for (let i = 0; i < elems.length; i++) {
				// удаляем все подсветки тегов/секций
				$(elems[i]).removeClass(`item-active-night`)
				$(elems[i]).removeClass(`item-active-light`)
			}
			// подсвечиваем активную секцию
			$(clickedElem)
				.parent()
				.addClass(`item-active-${theme}`)
			// подсвечиваем тег All
			const elemsArr = $("#side-tags .nav-item")
			for (let i = 0; i < elems.length; i++) {
				// удаляем все подсветки тегов/секций
				$(elemsArr[i]).removeClass(`item-active-night`)
				$(elemsArr[i]).removeClass(`item-active-light`)
			}
			// подсвечиваем второй элемент списка tags - item All
			$(elemsArr[1]).addClass(`item-active-${theme}`)
		} else if (name === "removeItems") {
			// если родитель elems содержит .nav-tabs
			if (
				$(elems[0])
					.parent()
					.hasClass("nav-tabs")
			) {
				// подсвечиваем первый элемент списка sections - item All
				$(elems[0]).addClass(`item-active-${theme}`)
			}
			// если родитель elems НЕ содержит .nav-tabs
			else {
				// подсвечиваем второй элемент списка tags - item All
				$(elems[1]).addClass(`item-active-${theme}`)
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
		<div className={`App-${theme}`}>
			<div className={`container-fluid app-user-${theme}`}>
				<div className="row">
					<UserPanel
						auth={auth}
						theme={theme}
						changeStatusLogin={changeStatusLoginToApp}
						userProfile={currentDetails.userProfile}
						getDataByLogin={getDataByLoginToApp}
						handlerHeaderPopup={handlerHeaderPopupToApp}
						handlerLang={handlerLangToApp}
						handlerTheme={handlerThemeToApp}
						resetHighlightItem={resetHighlightItem}
					/>
				</div>
			</div>
			<div className={`container-fluid app-header-${theme}`}>
				<div className="row">
					{auth ? (
						<SectionsPanel
							theme={theme}
							sections={sections}
							widthDisplay={widthDisplay}
							lang={currentDetails.userProfile.lang}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
							handlerValueFilters={handlerValueFiltersToApp}
							resetHighlightItem={resetHighlightItem}
						/>
					) : null}
				</div>
			</div>
			<div className="container-fluid">
				{auth ? (
					<div className="row">
						<nav
							id="side-tags"
							className={`col-md-4 col-lg-3 app-side-tags app-side-tags-${theme}`}
						>
							<SideBarTags
								theme={theme}
								filters={filters}
								tags={getFiltredArray("tagsArr", tags, filters)}
								heightDisplay={heightDisplay}
								lang={currentDetails.userProfile.lang}
								handlerHeaderPopup={handlerHeaderPopupToApp}
								handlerCurrentValue={handlerCurrentValueToApp}
								handlerValueFilters={handlerValueFiltersToApp}
								resetHighlightItem={resetHighlightItem}
								countQualityItems={countQualityItems}
							/>
						</nav>
						<SwitcherTags theme={theme} />
						<main className="col-md-8 ml-sm-auto col-lg-9 px-4 app-content">
							<SearchPanel
								theme={theme}
								lang={currentDetails.userProfile.lang}
								handlerCurrentValue={handlerCurrentValueToApp}
							/>
							<StatisticInfoPanel
								theme={theme}
								sections={sections}
								filters={filters}
								countQualityItems={countQualityItems}
								lang={currentDetails.userProfile.lang}
							/>
							<ItemNotes
								theme={theme}
								heightDisplay={heightDisplay}
								tags={getFiltredArray("tagsArr", tags, filters)}
								lang={currentDetails.userProfile.lang}
								notes={getFiltredArray(
									"notesArr",
									notes,
									filters,
									currentDetails.searchDetails.searchText,
									currentDetails.searchDetails.searchSort
								)}
								handlerHeaderPopup={handlerHeaderPopupToApp}
								handlerCurrentValue={handlerCurrentValueToApp}
							/>
						</main>
					</div>
				) : (
					<div className="row">
						<HelloPage lang={currentDetails.userProfile.lang} />
					</div>
				)}
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
				tags={getFiltredArray("tagsArr", tags, filters)}
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
			<UserMobileAuthPopup
				namePopup={namePopup}
				getDataByLogin={getDataByLoginToApp}
				lang={currentDetails.userProfile.lang}
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
