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
	AddNewSectionPopup,
	AddNewTagPopup,
	AddNewNotePopup,
	EditSectionPopup,
	EditTagPopup,
	EditNotePopup,
	RemoveItemPopup,
} from "../components"
import {
	getDataByLoginAction,
	getStatusLoginAction,
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

	// сброс подсветки у соседей и подсветка active section/tag
	const resetHighlightItem = (elem: any): void => {
		const elems = $(elem)
			.parent()
			.parent()
			.children()
		for (let i = 0; i < elems.length; i++) {
			$(elems[i]).removeClass("section-tab-active")
		}
		$(elem)
			.parent()
			.addClass("section-tab-active")
	}

	// функция получения значения id удаляемого Item
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
							tags={tags}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
							handlerValueFilters={handlerValueFiltersToApp}
							resetHighlightItem={resetHighlightItem}
						/>
					</nav>
					<main className="col-md-9 ml-sm-auto col-lg-9 px-4 app-content">
						<SearchPanel />
						<StatisticInfoPanel
							sections={sections}
							tags={tags}
							notes={notes}
							filters={filters}
						/>
						<ItemNotes
							notes={notes}
							handlerHeaderPopup={handlerHeaderPopupToApp}
							handlerCurrentValue={handlerCurrentValueToApp}
						/>
					</main>
				</div>
			</div>
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
			/>
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
