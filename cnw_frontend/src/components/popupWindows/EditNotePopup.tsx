import React, { useState, useEffect } from 'react';
import {
	DraftailEditor,
	BLOCK_TYPE,
	INLINE_STYLE,
	ENTITY_TYPE,
} from 'draftail';
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromHTML,
} from 'draft-js';
import { CONSTANTS } from '../../constants';
import { ICONS, CustomIcon, toHTML } from '../notesEditor';
import { LinkSource, ImageSource, ImageBlock, Link } from '../entities';
import '../../styles/ItemEdit.sass';

interface IEditNoteProps {
	tags: Array<{
		id: string;
		nameTag: string;
		sectionId: string;
		userId: string;
	}>;
	editNote: (editedNote: {
		id: string;
		header: string;
		text: string;
		remarks: string;
		link: string;
		sectionId: string;
		tagId: string;
		userId: string;
	}) => void;
	currentEditedNote: {
		id: string;
		header: string;
		text: string;
		remarks: string;
		link: string;
		sectionId: string;
		tagId: string;
		userId: string;
	};
	namePopup: string;
	lang: string;
}

export const EditNotePopup: React.FC<IEditNoteProps> = (props) => {
	const { editNote, currentEditedNote, namePopup, tags, lang } = props;

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty()
	);
	const [fields, setFields] = useState(currentEditedNote);

	const getContentFromHTML = (stringHTML: string): any => {
		const blocksFromHTML = convertFromHTML(stringHTML);
		const content = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks
		);
		return content;
	};

	useEffect(() => {
		setFields(currentEditedNote);
		if (currentEditedNote.text !== '') {
			setEditorState(
				EditorState.createWithContent(
					getContentFromHTML(currentEditedNote.text)
				)
			);
		}
	}, [currentEditedNote, setFields]);

	const handlerFields = (e: any): void => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	// получаем SectionId из tags[] по tagId из notes[]
	const getSectionIdtag = (tagId: string): string => {
		let noteTagSectionId = '0';
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id === tagId) noteTagSectionId = tags[i].sectionId;
		}
		return noteTagSectionId;
	};

	let tagsList: any = '';

	// получаем сортированный array tags[]
	const NewArr = tags.sort((a, b) => {
		if (a.nameTag < b.nameTag) {
			return -1;
		}
		return 0;
	});

	if (NewArr && NewArr.length !== 0) {
		tagsList = NewArr.map((item: any, index: number) => {
			return (
				<option key={index} className={item.tagId} value={item.id}>
					{item.nameTag}
				</option>
			);
		});
	}

	// react editors examples
	// https://github.com/thibaudcolas/draftail-playground
	// https://draftjs.org/docs/getting-started
	// https://reactjsexample.com/tag/editor/
	// https://www.draftail.org/docs/importing-and-exporting-html

	return (
		<div
			id="modal-editNote"
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{namePopup}</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form
						id="formEditNote"
						onSubmit={(ev) => ev.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="editHeaderNote">
									{CONSTANTS[lang].NAME_HEADER_NOTE}
								</label>
								<input
									id="editHeaderNote"
									name="header"
									type="text"
									value={fields.header}
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formEditNote"
									onChange={(event) => handlerFields(event)}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editTextNote">
									{CONSTANTS[lang].TEXT_NOTE}
								</label>
								<DraftailEditor
									editorState={editorState}
									onChange={setEditorState}
									entityTypes={[
										{
											type: ENTITY_TYPE.IMAGE,
											description: 'Image',
											icon: ICONS.IMAGE_ICON,
											source: ImageSource,
											block: ImageBlock,
										},
										{
											type: ENTITY_TYPE.LINK,
											description: 'Link',
											icon: ICONS.LINK_ICON,
											source: LinkSource,
											decorator: Link,
										},
									]}
									blockTypes={[
										{ type: BLOCK_TYPE.UNSTYLED },
										{ type: BLOCK_TYPE.HEADER_ONE },
										{ type: BLOCK_TYPE.HEADER_TWO },
										{ type: BLOCK_TYPE.HEADER_THREE },
										{ type: BLOCK_TYPE.HEADER_FOUR },
										{ type: BLOCK_TYPE.HEADER_FIVE },
										{ type: BLOCK_TYPE.HEADER_SIX },
										{
											type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
											icon: <CustomIcon icon="fa-list-ul" />,
										},
										{
											type: BLOCK_TYPE.ORDERED_LIST_ITEM,
											icon: <CustomIcon icon="fa-list-ol" />,
										},
										{ type: BLOCK_TYPE.CODE },
									]}
									inlineStyles={[
										{
											type: INLINE_STYLE.BOLD,
											icon: <CustomIcon icon="fa-bold" />,
										},
										{
											type: INLINE_STYLE.ITALIC,
											icon: <CustomIcon icon="fa-italic" />,
										},
										{
											type: INLINE_STYLE.UNDERLINE,
											icon: <CustomIcon icon="fa-underline" />,
										},
										{
											type: INLINE_STYLE.STRIKETHROUGH,
											icon: <CustomIcon icon="fa-strikethrough" />,
										},
										{
											type: INLINE_STYLE.CODE,
											icon: <CustomIcon icon="fa-code" />,
										},
										{
											type: INLINE_STYLE.MARK,
											icon: <CustomIcon icon="fa-highlighter" />,
										},
										{
											type: INLINE_STYLE.SMALL,
											icon: <CustomIcon icon="fa-text-height" />,
											description: 'Mono Space',
										},
										{
											type: INLINE_STYLE.SAMPLE,
											icon: <CustomIcon icon="fa-font" />,
										},
										{ type: INLINE_STYLE.KEYBOARD },
										{
											type: INLINE_STYLE.SUPERSCRIPT,
											icon: <CustomIcon icon="fa-superscript" />,
										},
										{
											type: INLINE_STYLE.SUBSCRIPT,
											icon: <CustomIcon icon="fa-subscript" />,
										},
									]}
									enableHorizontalRule={{ description: 'Horizontal rule' }}
									enableLineBreak={{
										description: 'Soft line break',
										icon: ICONS.BR_ICON,
									}}
									showUndoControl={{
										description: 'Undo last change',
										icon: ICONS.UNDO_ICON,
									}}
									showRedoControl={{
										description: 'Redo last change',
										icon: ICONS.REDO_ICON,
									}}
								/>
							</div>

							<div className="form-label-group">
								<label htmlFor="editNoteTagId">
									{CONSTANTS[lang].SELECT_TAG}
								</label>
								<select
									id="editNoteTagId"
									name="tagId"
									className="form-control"
									aria-describedby="formEditNote"
									value={fields.tagId}
									onChange={(event) => handlerFields(event)}
								>
									{tagsList}
									<option value="0">Untagged</option>
								</select>
								<div className="invalid-feedback">
									Please select a tag Note
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editRemarksNote">
									{CONSTANTS[lang].REMARK_NOTE}
								</label>
								<input
									id="editRemarksNote"
									name="remarks"
									type="text"
									value={fields.remarks}
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formEditNote"
									onChange={(event) => handlerFields(event)}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editLinkNote">
									{CONSTANTS[lang].LINK_NOTE}
								</label>
								<input
									id="editLinkNote"
									name="link"
									type="text"
									value={fields.link}
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formEditNote"
									onChange={(event) => handlerFields(event)}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>

						<div className="modal-footer">
							<button
								disabled={
									fields.header === '' ||
									currentEditedNote.text === '<p></p>'
								}
								onClick={() => {
									const content = convertToRaw(
										editorState.getCurrentContent()
									);
									const editedNote = {
										id: fields.id,
										header: fields.header,
										text: toHTML(content),
										remarks: fields.remarks,
										link: fields.link,
										sectionId: getSectionIdtag(fields.tagId),
										tagId: fields.tagId,
										userId: fields.userId,
									};
									// отправляем editedNote в store
									editNote(editedNote);
									setEditorState(EditorState.createEmpty());
								}}
								type="button"
								className="btn btn-success btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_SAVE}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
