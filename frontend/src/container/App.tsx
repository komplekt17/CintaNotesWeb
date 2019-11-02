import React from "react"
// import $ from "jquery"
import { connect } from "react-redux"
import {
	SectionsPanel,
	SideTags,
	SearchPanel,
	ItemNotes,
	AddNewSectionPopup,
} from "../components"
import {
	getAllNotesAction,
	addNewSectionAction,
	handlerInputsValueAction,
} from "../actions/actions"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../styles/App.css"

interface IAppProps {
	store: { sections: [], tags: [], notes: [], inputValueSection: string };
	getAllNotesToApp: () => void;
	addNewSectionToApp: (text: string) => void;
	handlerInputsValueToApp: (name: string, value: string) => void;
}

const App: React.FC<IAppProps> = props => {
	const {
		store,
		getAllNotesToApp,
		addNewSectionToApp,
		handlerInputsValueToApp,
	} = props

	const { sections, tags, notes, inputValueSection } = store

	return (
		<div className="App">
			<div className="container-fluid app-header">
				<div className="row">
					<SectionsPanel sections={sections} />
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
				inputValueSection={inputValueSection}
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
		handlerInputsValueToApp: (name: string, value: string) =>
			dispatch(handlerInputsValueAction(name, value)),
		addNewSectionToApp: (nameButton: string) =>
			dispatch(addNewSectionAction(nameButton)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
