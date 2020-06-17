import { Component } from "react"
import { RichUtils, EditorState, EntityInstance } from "draft-js"

import createEntity from "./createEntity"

interface IProps {
	editorState: EditorState;
	entityType: {
		type: string,
	};
	entity: EntityInstance;
	onComplete: (nextState: any) => void;
}

export class LinkSource extends Component<IProps> {
	static defaultProps = {
		entity: null,
	}

	componentDidMount() {
		const { editorState, entity, entityType, onComplete } = this.props
		const url = window.prompt("Link URL", entity ? entity.getData().url : "")
		let nextState = editorState

		if (url) {
			const selection = editorState.getSelection()
			const entityData = {
				url,
			}

			const hasText = !selection.isCollapsed()

			if (hasText) {
				const contentState = editorState.getCurrentContent()
				const contentStateWithEntity = contentState.createEntity(
					entityType.type,
					"MUTABLE",
					entityData
				)

				const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
				nextState = RichUtils.toggleLink(editorState, selection, entityKey)
			} else {
				nextState = createEntity(
					editorState,
					entityType.type,
					entityData,
					url,
					"MUTABLE"
				)
			}
		}

		onComplete(nextState)
	}

	render() {
		return null
	}
}
