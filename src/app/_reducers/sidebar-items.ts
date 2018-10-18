export interface SidebarItem {
    name: string;
    to: string;
}
export interface SidebarItemState extends Array<SidebarItem> { }

export const INITIAL_STATE = window['panelSettings'].sidebars;

export function sidebarItems(state: SidebarItemState = INITIAL_STATE): SidebarItemState {
    return state;
}