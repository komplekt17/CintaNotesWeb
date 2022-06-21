import React from "react"
import { ContentBlock, EditorState, EntityInstance } from "draft-js"

interface IProps {
	block: ContentBlock;
	blockProps: {
		editorState: EditorState,
		entity: EntityInstance,
		onChange: () => void,
	};
}

/**
 * Editor block to preview and edit images.
 */
export class ImageBlock extends React.Component<IProps> {
	render() {
		const { blockProps } = this.props
		const { entity } = blockProps
		const { src, alt } = entity.getData()

		return <img className="ImageBlock" src={src} alt={alt} width="256" />
	}
}
