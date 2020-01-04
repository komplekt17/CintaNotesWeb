import * as React from "react"
import { IUserProfile } from "../../types"
import { CONSTANTS } from "../../constants"
import $ from "jquery"

interface IAddNewTagPopup {
	sections: [];
	addNewTag: (newTag: {
		nameTag: any,
		sectionId: any,
		userId: string,
	}) => void;
	namePopup: string;
	userProfile: IUserProfile;
}

export const AddNewTagPopup: React.FC<IAddNewTagPopup> = props => {
	const { sections, addNewTag, namePopup, userProfile } = props
	const { lang, id } = userProfile

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
			id="modal-addTag"
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
						id="formAddTag"
						onSubmit={event => event.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="addNameTag">Name Tag</label>
								<input
									id="addNameTag"
									type="text"
									className="form-control"
									placeholder="enter Name Tag"
									aria-describedby="formAddTag"
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
							<div className="form-label-group">
								<label htmlFor="addTagSectionId">Select Section</label>
								<select
									id="addTagSectionId"
									className="form-control"
									aria-describedby="formAddTag"
								>
									{sectionsList}
									<option value="0">All</option>
								</select>
								<div className="invalid-feedback">Please select a section</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => {
									const nameTag = $("#addNameTag").val()
									const sectionId = $("#addTagSectionId").val()
									if (nameTag !== "" && sectionId !== "") {
										const newTag = {
											nameTag,
											sectionId,
											userId: id,
										}
										addNewTag(newTag)
										$("#addNameTag").val("")
										$("#addTagSectionId").val("")
									}
								}}
								type="button"
								className="btn btn-info btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_CREATE}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
