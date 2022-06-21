import * as React from 'react';
import $ from 'jquery';
import { INotes, ITags } from '../types';
import { CONSTANTS } from '../constants';
import '../styles/ItemNotes.sass';
import Scrollbar from 'react-scrollbars-custom';

interface INoteItemProps {
	tags: ITags[];
	notes: INotes[];
	lang: string;
	theme: string;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	heightDisplay: number;
}

const ItemNotes: React.FC<INoteItemProps> = (props) => {
	const {
		tags,
		notes,
		lang,
		theme,
		heightDisplay,
		handlerHeaderPopup,
		handlerCurrentValue,
	} = props;

	// получение отформатированной даты создания/редактирования
	const getDateNormed = (date: string): string => {
		// отрезаем перед . 2019-12-15T08:46:08.000Z
		const arrD = date.split('.');
		// отрезаем перед T 2019-12-15T08:46:08.000Z
		const arrT = arrD[0].split('T');
		// преобразуем дату к виду DD.MM.YYYY
		const arrR = arrT[0].split('-');
		const result = `${arrR[2]}.${arrR[1]}.${arrR[0]}, ${arrT[1]}`;
		return result;
	};

	let NotesList: any = (
		<div className="col-12">{CONSTANTS[lang].ERROR_TEXT}</div>
	);

	// получение nameTag из tags[]
	const getNameTag = (tagIdfromNotes: string): string => {
		let nameTag = 'Untagged';
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id === tagIdfromNotes) {
				nameTag = tags[i].nameTag;
			}
		}
		return nameTag;
	};

	if (notes && notes.length !== 0) {
		NotesList = notes.map((item: any, index: number) => {
			return (
				<div key={index} className="col-12 note" id={item.id}>
					{item.link === '' ? (
						<div className={`note-header-${theme}`}>{item.header}</div>
					) : (
						<div className={`note-header-${theme}`}>
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fas fa-reply" />
							</a>{' '}
							{item.header}
						</div>
					)}

					<div className="note-info">
						<div className="note-tag">
							<span
								className="text-primary"
								onClick={() => {
									$(`#${item.id} .arrow-switch`).toggleClass(
										'd-none',
										2000
									);
									$(`#${item.id} .note-text`).toggleClass(
										'note-text-short',
										2000
									);
								}}
							>
								<i className="arrow-switch d-none fas fa-angle-double-down" />
								<i className="arrow-switch fas fa-angle-double-up" />
							</span>
							<span className="text-primary name-tag pl-2">
								{getNameTag(item.tagId)}
							</span>
						</div>
						<div className="note-date">
							{item.updatedAt === item.createdAt ? (
								''
							) : (
								<span>
									<i
										className="far fa-calendar-alt text-primary"
										title="updated"
									/>
									{'   ' + getDateNormed(item.updatedAt)}
									<span className="date-devision"> | </span>
								</span>
							)}
							<span>
								<i
									className="fas fa-calendar-alt text-info"
									title="created"
								/>
								{'   ' + getDateNormed(item.createdAt)}
							</span>
						</div>
					</div>
					<div
						className="note-text note-text-short p-2"
						dangerouslySetInnerHTML={{ __html: item.text }}
					/>
					<div className="note-footer">
						<div className="note-tags text-info">{item.remarks}</div>
						<div className="note-button">
							<span
								className="text-success"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_NOTE);
									// сохраняем id удаляемой Note
									handlerCurrentValue('saveIdEditedNote', item.id);
									$('#modal-editNote').modal('show');
								}}
							>
								<i className="fas fa-edit" />
							</span>
							{'  '}
							<span
								className="text-danger"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_REMOVE_NOTE);
									// сохраняем id удаляемой Note
									handlerCurrentValue('saveIdRemovedNote', item.id);
									$('#modal-removeItem').modal('show');
								}}
							>
								<i className="fas fa-trash-alt" />
							</span>
						</div>
					</div>
				</div>
			);
		});
	}
	return (
		<Scrollbar style={{ height: heightDisplay - 180 }}>
			{NotesList}
		</Scrollbar>
	);
};

export { ItemNotes };
