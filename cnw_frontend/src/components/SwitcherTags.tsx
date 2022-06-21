import * as React from "react"
import $ from "jquery"

interface ISwitcherTagsProps {
	theme: string;
}

export const SwitcherTags: React.FC<ISwitcherTagsProps> = ({ theme }) => {
	return (
		<div
			className={`switcher-tags switcher-tags-${theme}`}
			onClick={() => {
				$(`.tags-switch`).toggleClass("d-none")
				$(`#side-tags`).toggleClass("app-side-tags")
				$(`#side-tags`).toggleClass("app-side-tags-mobile")
			}}
		>
			<i className="tags-switch d-none fas fa-angle-double-left" />
			<i className="tags-switch fas fa-angle-double-right" />
		</div>
	)
}
