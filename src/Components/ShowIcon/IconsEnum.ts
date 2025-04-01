export enum IconsEnum {
    DELETE = 'delete',
    EDIT = 'edit_square'
}

export type IconsType = `${(typeof IconsEnum)[keyof typeof IconsEnum]}`