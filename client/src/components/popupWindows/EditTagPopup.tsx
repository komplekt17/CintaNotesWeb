import React, { useState, useEffect } from "react"
import { CONSTANTS } from "../../constants"

interface IEditTagProps {
	sections: [];
	editTag: (editedTag: {
		id: string,
		nameTag: string,
		sectionId: string,
		userId: string,
	}) => void;
	currentEditedTag: {
		id: string,
		nameTag: string,
		userId: string,
		sectionId: string,
	};
	namePopup: string;
	lang: string;
}

export const EditTagPopup: React.FC<IEditTagProps> = props => {
	const { editTag, currentEditedTag, namePopup, lang, sections } = props

	const [fields, setFields] = useState(currentEditedTag)

	// обновляем стейт после обновления props
	useEffect(() => {
		setFields(currentEditedTag)
	}, [currentEditedTag, setFields])

	let sectionsList: any = ""

	if (sections && sections.length !== 0) {
		sectionsList = sections.map((item: any, index: number) => {
			return (
				<option key={index} className={item.sectionId} value={item.id}>
					{item.nameSection}
				</option>
			)
		})
	}

	return (
		<div
			className="modal fade"
			id="modal-editTag"
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
						id="formEditTag"
						onSubmit={ev => ev.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="editNameTag">{CONSTANTS[lang].NAME_TAG}</label>
								<input
									id="editNameTag"
									name="nameTag"
									type="text"
									className="form-control"
									placeholder="enter Name Tag"
									aria-describedby="formEditTag"
									value={fields.nameTag}
									onChange={e =>
										setFields({ ...fields, [e.target.name]: e.target.value })
									}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editTagSectionId">
									{CONSTANTS[lang].SELECT_SECTION}
								</label>
								<select
									id="editTagSectionId"
									name="sectionId"
									className="form-control"
									aria-describedby="formEditTag"
									value={fields.sectionId}
									onChange={e =>
										setFields({ ...fields, [e.target.name]: e.target.value })
									}
								>
									{sectionsList}
									<option value="0">All</option>
								</select>
								<div className="invalid-feedback">
									Please select a page categorie
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								disabled={fields.nameTag === ""}
								onClick={() => {
									const editedTag = {
										id: fields.id,
										nameTag: fields.nameTag,
										sectionId: fields.sectionId,
										userId: fields.userId,
									}
									editTag(editedTag)
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
	)
}
