import * as React from "react"
import { AuthFalseButton } from "../popupWindows"
import { CONSTANTS } from "../../constants"

interface IEditTagProps {
	sections: [];
	editTag: (editedTag: {
		id: string,
		nameTag: string,
		sectionId: string,
		userId: string,
	}) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	currentEditedTag:	{
		id: string;
    nameTag: string;
    userId: string;
		sectionId: string;
	}
	namePopup: string;
	lang: string;
	auth: boolean;
}

export const EditTagPopup: React.FC<IEditTagProps> = props => {
	const {
		editTag,
		handlerCurrentValue,
		currentEditedTag,
		namePopup,
		lang,
		sections,
		auth,
	} = props

	const {id, nameTag, sectionId, userId} = currentEditedTag

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
								<label htmlFor="editNameTag">
									{CONSTANTS[lang].NAME_TAG}
								</label>
								<input
									id="editNameTag"
									type="text"
									value={nameTag}
									className="form-control"
									placeholder="enter Name Tag"
									aria-describedby="formEditTag"
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editTagSectionId">
									{CONSTANTS[lang].SELECT_SECTION}
								</label>
								<select
									value={sectionId == null ? "" : sectionId}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editTagSectionId"
									className="form-control"
									aria-describedby="formEditTag"
								>
									{sectionsList}
									<option value="0">All</option>
								</select>
								<div className="invalid-feedback">
									Please select a page categorie
								</div>
							</div>
						</div>
					{auth ? (
						<div className="modal-footer"> 
							<button
								onClick={() => {
									if (nameTag !== "") {
										const editedTag = {
											id, 
											nameTag, 
											sectionId,
											userId,
										}
										editTag(editedTag)
										// очищаем поля currentDetails.tag,
										// action.name === buttonEditTag
										handlerCurrentValue("buttonEditTag", "")
									}
								}}
								type="button"
								className="btn btn-success btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_SAVE}
							</button>
						</div>
					) : (
						<AuthFalseButton
							colorButton="success"
							nameButton={CONSTANTS[lang].BUTTON_SAVE}
							lang={lang}
						/>
					)}
					</form>
				</div>
			</div>
		</div>
	)
}
