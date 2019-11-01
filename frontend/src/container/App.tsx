import React from "react"
import { connect } from "react-redux"
import {
	SectionsPanel,
	SideTags,
	SearchPanel,
	ItemNotes,
	AddNewSectionPopup,
} from "../components"
import { getAllNotesAction, addNewSectionAction } from "../actions"
import "bootswatch/dist/superhero/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "../styles/App.css"

interface IAppProps {
	store: { sections: [], tags: [], notes: [] };
	getAllNotesToApp: () => void;
	addNewSectionToApp: (text: string) => string;
}

const App: React.FC<IAppProps> = props => {
	const { store, getAllNotesToApp, addNewSectionToApp } = props
	const { sections, tags, notes } = store

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
			<AddNewSectionPopup addNewSection={addNewSectionToApp} />
		</div>
	)
}

const mapStateToProps = (state: any) => {
	return { store: state }
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		getAllNotesToApp: () => dispatch(getAllNotesAction()),
		addNewSectionToApp: (text: string) =>
			dispatch(addNewSectionAction(text)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
