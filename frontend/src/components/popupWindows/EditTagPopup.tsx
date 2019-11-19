import * as React from "react"
// import { ERROR_TEXT } from "../../constants"
// import $ from "jquery"

interface IEditTagProps {
	sections: [];
	editTag: (editedTag: {
		id: string,
		nameTag: string,
		sectionID: string,
	}) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	currentEditedTag:	{
		_id: string;
    nameTag: string;
    userID: string;
		sectionID: string;
	}
	namePopup: string;
}

export const EditTagPopup: React.FC<IEditTagProps> = props => {
	const {
		editTag,
		handlerCurrentValue,
		currentEditedTag,
		namePopup,
		sections
	} = props

	const {_id, nameTag, sectionID} = currentEditedTag

	let sectionsList: any = ""

	if (sections && sections.length !== 0) {
		sectionsList = sections.map((item: any, index: number) => {
			return (
				<option key={index} className={item.sectionID} value={item._id}>
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
								<label htmlFor="editNameTag">Name Tag</label>
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
								<label htmlFor="editTagSectionID">Select Cathegorie</label>
								<select
									value={sectionID == null ? "" : sectionID}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editTagSectionID"
									className="form-control"
									aria-describedby="formEditTag"
								>
									{sectionsList}
									<option value="All">All</option>
								</select>
								<div className="invalid-feedback">
									Please select a page categorie
								</div>
							</div>
						</div>
						<div className="modal-footer"> 
							<button
								onClick={() => {
									if (nameTag !== "") {
										const editedTag = {id: _id, nameTag, sectionID}
										editTag(editedTag)
										// очищаем поля currentDetails.tag,
										// action.name === buttonEditTag
										handlerCurrentValue("buttonEditTag", "")
									}
								}}
								type="button"
								className="btn btn-success"
							>
								Save Tag
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
