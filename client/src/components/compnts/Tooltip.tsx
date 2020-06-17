import React from "react"

import "./Tooltip.css"

const TOP = "top"
const LEFT = "left"
const TOP_LEFT = "top-left"

export interface ITarget {
	top: number;
	left: number;
	width: number;
	height: number;
}

type Direction = "top" | "left" | "top-left"

const getTooltipStyles = (target: ITarget, direction: Direction) => {
	const top = window.pageYOffset + target.top
	const left = window.pageXOffset + target.left
	switch (direction) {
		case TOP:
			return {
				top: top + target.height,
				left: left + target.width / 2,
			}
		case LEFT:
			return {
				top: top + target.height / 2,
				left: left + target.width,
			}
		case TOP_LEFT:
		default:
			return {
				top: top + target.height,
				left,
			}
	}
}

interface IProps {
	target: ITarget;
	direction: Direction;
	children: React.ReactNode;
}

/**
 * A tooltip, with arbitrary content.
 */
export const Tooltip = ({ target, children, direction }: IProps) => {
	return (
		<div
			style={getTooltipStyles(target, direction)}
			className={`Tooltip Tooltip--${direction}`}
			role="tooltip"
		>
			{children}
		</div>
	)
}
