import React from "react"
// import $ from "jquery"
import { connect } from "react-redux"
import {
	UserPanel,
	SectionsPanel,
	SideBarTags,
	SearchPanel,
	ItemNotes,
	AddNewSectionPopup,
	AddNewTagPopup,
	EditSectionPopup,
	EditTagPopup,
	RemoveItemPopup,
} from "../components"
import {
	getDataByLoginAction,
	getStatusLoginAction,
	addNewSectionAction,
	addNewTagAction,
	editSectionAction,
	editTagAction,
	removeItemAction,
	handlerCurrentValueAction,
	handlerHeaderPopupAction,
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
		editSectionToApp,
		editTagToApp,
		removeItemToApp,
		handlerCurrentValueToApp,
		handlerHeaderPopupToApp,
	} = props

	const { sections, tags, notes, currentDetails, namePopup, auth } = store

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
						/>
					</nav>
					<main className="col-md-9 ml-sm-auto col-lg-9 px-4 app-content">
						<SearchPanel />
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
				inputValueSection={currentDetails.section.nameSection}
				namePopup={namePopup}
			/>
			<AddNewTagPopup
				sections={sections}
				addNewTag={addNewTagToApp}
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
		addNewSectionToApp: (value: string) =>
			dispatch(addNewSectionAction(value)),
		addNewTagToApp: (newTag: { nameTag: any, sectionID: any }) =>
			dispatch(addNewTagAction(newTag)),
		editSectionToApp: (editedSection: { id: string, nameSection: string }) =>
			dispatch(editSectionAction(editedSection)),
		editTagToApp: (editedTag: {
			id: string,
			nameTag: string,
			sectionID: string,
		}) => dispatch(editTagAction(editedTag)),
		removeItemToApp: (name: string, id: string) =>
			dispatch(removeItemAction(name, id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
