import React from "react"
import { BLOCK_TYPE, ENTITY_TYPE } from "draftail"
import { convertToHTML, convertFromHTML } from "draft-convert"
import { convertFromRaw, convertToRaw } from "draft-js"

// FOR EXPORT
const exporterConfig = {
	blockToHTML: block => {
		if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
			// tslint:disable-next-line: no-angle-bracket-type-assertion
			return <blockquote />
		}

		if (block.type === BLOCK_TYPE.CODE) {
			// tslint:disable-next-line: no-angle-bracket-type-assertion
			return <pre />
		}

		// Discard atomic blocks, as they get converted based on their entity.
		if (block.type === BLOCK_TYPE.ATOMIC) {
			return {
				start: "",
				end: "",
			}
		}

		return null
	},

	entityToHTML: (entity, originalText) => {
		if (entity.type === ENTITY_TYPE.LINK) {
			return (
				<a href={entity.data.url} target="_blank" rel="noopener noreferrer">
					{originalText}
				</a>
			)
		}

		if (entity.type === ENTITY_TYPE.IMAGE) {
			return <img src={entity.data.src} alt={entity.data.alt} />
		}

		if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
			// tslint:disable-next-line: no-angle-bracket-type-assertion
			return <hr />
		}

		return originalText
	},
}

// FOR IMPORT
const importerConfig = {
	htmlToEntity: (nodeName, node, createEntity) => {
		// a tags will become LINK entities, marked as mutable, with only the URL as data.
		if (nodeName === "a") {
			return createEntity(ENTITY_TYPE.LINK, "MUTABLE", { url: node.href })
		}

		if (nodeName === "img") {
			return createEntity(ENTITY_TYPE.IMAGE, "IMMUTABLE", {
				src: node.src,
			})
		}

		if (nodeName === "hr") {
			return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, "IMMUTABLE", {})
		}

		return null
	},
	htmlToBlock: nodeName => {
		if (nodeName === "hr" || nodeName === "img") {
			// "atomic" blocks is how Draft.js structures block-level entities.
			return "atomic"
		}

		return null
	},
}

// for export text note toHTML
const toHTML = raw =>
	raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : ""

// FOR IMPORT
const fromHTML = htmlString =>
	htmlString !== ""
		? convertToRaw(convertFromHTML(importerConfig)(htmlString))
		: ""

export { toHTML, fromHTML }
