import React from "react"
// import $ from "jquery"
import { connect } from "react-redux"
import {
	SectionsPanel,
	SideTags,
	SearchPanel,
	ItemNotes,
	AddNewSectionPopup,
	RemoveSectionPopup,
} from "../components"
import {
	getAllNotesAction,
	addNewSectionAction,
	removeSectionAction,
	handlerInputsValueAction,
	handlerHeaderPopupAction,
} from "../actions"
import { IAppProps } from "../types"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../styles/App.css"

const App: React.FC<IAppProps> = props => {
	const {
		store,
		getAllNotesToApp,
		addNewSectionToApp,
		removeSectionToApp,
		handlerInputsValueToApp,
		handlerHeaderPopupToApp,
	} = props

	const { sections, tags, notes, currentDetails, namePopup } = store

	return (
		<div className="App">
			<div className="container-fluid app-header">
				<div className="row">
					<SectionsPanel
						sections={sections}
						handlerHeaderPopup={handlerHeaderPopupToApp}
						handlerInputsValue={handlerInputsValueToApp}
					/>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<nav className="col-md-2 d-none d-md-block app-side-tags">
						<SideTags tags={tags} getAllNotes={getAllNotesToApp} />
					</nav>
					<main className="col-md-9 ml-sm-auto col-lg-10 px-4 app-content">
						<SearchPanel />
						<ItemNotes notes={notes} />
					</main>
				</div>
			</div>
			<AddNewSectionPopup
				addNewSection={addNewSectionToApp}
				handlerInputsValue={handlerInputsValueToApp}
				inputValueSection={currentDetails.section.nameSection}
				namePopup={namePopup}
			/>
			<RemoveSectionPopup
				removeSection={removeSectionToApp}
				handlerInputsValue={handlerInputsValueToApp}
				namePopup={namePopup}
				idRemovedSection={currentDetails.section._id}
			/>
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		getAllNotesToApp: () => dispatch(getAllNotesAction()),
		handlerHeaderPopupToApp: (header: string) =>
			dispatch(handlerHeaderPopupAction(header)),
		handlerInputsValueToApp: (name: string, value: string) =>
			dispatch(handlerInputsValueAction(name, value)),
		addNewSectionToApp: (nameButton: string) =>
			dispatch(addNewSectionAction(nameButton)),
		removeSectionToApp: (id: string) => dispatch(removeSectionAction(id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
