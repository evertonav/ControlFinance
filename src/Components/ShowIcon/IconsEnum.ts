export enum IconsEnum {
    DELETE = 'delete',
    EDIT = 'edit_square',
    MENU = 'menu',
    SEARCH = 'search',
    FILTER = 'filter_alt'
}

export type IconsType = `${(typeof IconsEnum)[keyof typeof IconsEnum]}`