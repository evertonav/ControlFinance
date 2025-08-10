export enum IconsEnum {
    DELETE = 'delete',
    EDIT = 'edit_square',
    MENU = 'menu'
}

export type IconsType = `${(typeof IconsEnum)[keyof typeof IconsEnum]}`