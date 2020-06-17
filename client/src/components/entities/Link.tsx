import React from "react"
import { ContentState } from "draft-js"

import TooltipEntity from "./TooltipEntity"
import { ICONS } from "../notesEditor"

interface IProps {
	entityKey: string;
	contentState: ContentState;
	children: React.ReactNode;
	onEdit: () => void;
	onRemove: () => void;
}

export const Link = (props: IProps) => {
	const { entityKey, contentState } = props
	const { url } = contentState.getEntity(entityKey).getData()
	return (
		<TooltipEntity
			{...props}
			icon={ICONS.LINK_ICON}
			label={url.replace(/(^\w+:|^)\/\//, "").split("/")[0]}
		/>
	)
}
