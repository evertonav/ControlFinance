export enum IconsEnum {
    DELETE = 'delete',
    EDIT = 'edit_square',
    MENU = 'menu',
    SEARCH = 'search',
    FILTER = 'filter_alt',
    COPY = 'move_group'
}

export type IconsType = `${(typeof IconsEnum)[keyof typeof IconsEnum]}`