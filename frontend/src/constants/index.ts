interface IConstants {
	[key: string]: {
		[key: string]: string,
	};
}
const SERVER_URI = "http://localhost:5000"
const CONSTANTS: IConstants = {
	ru: {
		ERROR_TEXT: "Нет элементов для отображения",
		FEEDBACK_EMAIL: "Введите ваш емайл (мин 4 символа)",
		FEEDBACK_PASS:
			"Введите пароль (мин 6 символов - только латиница и цифры)",
		FEEDBACK_LINK: "Введите ссылку типа http://....",
		FEEDBACK_TEXT:
			"Введите название (мин 3 символа - только латиница и цифры)",
		FEEDBACK_TEXT_REMOVE: "Точно удалить",
		FEEDBACK_HEADER_REMOVE: "Удаление",

		HEADER_CREATE_USER: "Создание Пользователя",
		HEADER_CHANGE_PASS: "Смена Пароля",
		HEADER_RESET_PASS: "Сброс Пароля",

		HEADER_ADD_SECTION: "Создание Секции",
		HEADER_EDIT_SECTION: "Редактирование Секции",
		HEADER_REMOVE_SECTION: "Section",

		HEADER_ADD_TAG: "Создание Тега",
		HEADER_EDIT_TAG: "Изменение Тега",
		HEADER_REMOVE_TAG: "Tag",

		HEADER_ADD_NOTE: "Создание записи",
		HEADER_EDIT_NOTE: "Изменение Записи",
		HEADER_REMOVE_NOTE: "Note",

		BUTTON_LOGIN: "Войти",
		BUTTON_ALL: "Все",
		BUTTON_ADD_TAG: "Добавить Тег",
		BUTTON_ADD_NOTE: "Добавить Запись",
		BUTTON_SEARCH: "Найти",
		BUTTON_CREATE: "Создать",
		BUTTON_SAVE: "Сохранить",
		BUTTON_REMOVE: "Удалить",
		BUTTON_RESET: "Сбросить Пароль",

		ITEMS_ALL: "Всего записей",
		ITEMS_NOTAG: "Записей без тега",
		ITEMS_ACTIVE_SECTION: "Активная вкладка",
		ITEMS_TAGS: "Тегов",
		ITEMS_NOTES: "Записей",

		MENU_REG: "Зарегистрироваться",
		MENU_RESET_PASS: "Забыли пароль",
		MENU_LOGOUT: "Выйти",
		MENU_CHANGE_PASS: "Сменить пароль",
	},
	en: {
		ERROR_TEXT: "no items to render",
		FEEDBACK_EMAIL: "Please enter a email (min 4 symbols)",
		FEEDBACK_PASS:
			"Please enter a password (min 6 symbols - lowercase/uppercase only latin letters and numbers)",
		FEEDBACK_LINK: "Please enter a link type http://....",
		FEEDBACK_TEXT:
			"Please enter a page name (minimum 3 symbols, only digits or letters)",
		FEEDBACK_TEXT_REMOVE: "Are you sure to delete this",
		FEEDBACK_HEADER_REMOVE: "Removing",

		HEADER_CREATE_USER: "Creating New User",
		HEADER_CHANGE_PASS: "Changing User Password",
		HEADER_RESET_PASS: "Reseting User Password",

		HEADER_ADD_SECTION: "Adding New Section",
		HEADER_EDIT_SECTION: "Editing Section",
		HEADER_REMOVE_SECTION: "Section",

		HEADER_ADD_TAG: "Adding New Tag",
		HEADER_EDIT_TAG: "Editing Tag",
		HEADER_REMOVE_TAG: "Tag",

		HEADER_ADD_NOTE: "Adding New Note",
		HEADER_EDIT_NOTE: "Editing Note",
		HEADER_REMOVE_NOTE: "Note",

		BUTTON_LOGIN: "LogIn",
		BUTTON_ALL: "All",
		BUTTON_ADD_TAG: "Add Tag",
		BUTTON_ADD_NOTE: "Add Note",
		BUTTON_SEARCH: "Search",
		BUTTON_CREATE: "Create",
		BUTTON_SAVE: "Save",
		BUTTON_REMOVE: "Remove",
		BUTTON_RESET: "Reset Password",

		ITEMS_ALL: "All",
		ITEMS_NOTAG: "Untagged",
		ITEMS_ACTIVE_SECTION: "Active Section",
		ITEMS_TAGS: "Tags",
		ITEMS_NOTES: "Notes",

		MENU_REG: "Registration",
		MENU_RESET_PASS: "Forgot password",
		MENU_LOGOUT: "LogOut",
		MENU_CHANGE_PASS: "Change pass",
	},
}

export { CONSTANTS, SERVER_URI }
