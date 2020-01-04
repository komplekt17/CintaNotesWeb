import * as React from "react"

interface ICustomIconProps {
	icon: string;
}

export const CustomIcon: React.FC<ICustomIconProps> = ({ icon }) => {
	let customIcon = <i />
	if (icon === "fa-bold") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-italic") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-underline") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-strikethrough") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-code") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-highlighter") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-text-height") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-font") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-superscript") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-subscript") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-list-ul") {
		customIcon = <i className={`fas ${icon}`} />
	} else if (icon === "fa-list-ol") {
		customIcon = <i className={`fas ${icon}`} />
	}

	return customIcon
}
export const BR_ICON =
	"M.436 633.471l296.897-296.898v241.823h616.586V94.117h109.517v593.796H297.333v242.456z"
export const UNDO_ICON =
	"M496.485 78c-137.092 0-261.213 55.575-351.046 145.439L.031 78v372.364h372.364L233.224 311.193c67.398-67.398 160.488-109.072 263.292-109.072 205.638 0 372.364 166.726 372.364 372.364 0 111.212-48.78 211.037-126.077 279.273l82.107 93.09C927.992 855.868 993 722.778 993 574.485 993 300.27 770.73 78 496.517 78h-.031z"
export const REDO_ICON =
	"M0 576c0 152.928 67.04 290.176 173.344 384l84.672-96C178.304 793.632 128 690.688 128 576c0-212.064 171.936-384 384-384 106.048 0 202.048 42.976 271.52 112.48L640 448h384V64L874.016 213.984C781.376 121.312 653.376 64 512 64 229.216 64 0 293.216 0 576z"
