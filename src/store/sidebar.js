/*
 *  左侧菜单 菜单+按钮 数据
 */
import Vue from 'vue';

export const SET_MENU = 'SET_MENU';//设置菜单信息
export const UNSET_MENU = 'UNSET_MENU';//删除菜单信息
export const SET_MENUANDBUTTON = 'SET_MENUANDBUTTON';//设置菜单和按钮信息
export const UNSET_MENUANDBUTTON = 'UNSET_MENUANDBUTTON';//删除菜单和按钮信息

const state ={
    sidebarMenu: JSON.parse(sessionStorage.getItem('menu')) || [],
    menuAndButton : JSON.parse(sessionStorage.getItem('menuAndButtons')) || []
};
const mutations = {
    [SET_MENU](state, menu) {
        if(typeof menu != 'undefined'){
            sessionStorage.setItem('menu', JSON.stringify(menu));
            console.log(state, menu)
            //Object.assign(state, menu);
            //console.log(menu)
            state.sidebarMenu = menu;

        }
    },
    [UNSET_MENU](state) {
        sessionStorage.removeItem('menu');
        //Object.keys(state).forEach(k => Vue.delete(state, k));
        state.sidebarMenu = [];
    },
    [SET_MENUANDBUTTON](state, menuAndButton) {
        if(typeof menuAndButton != 'undefined'){
            sessionStorage.setItem('menuAndButtons', JSON.stringify(menuAndButton));
            state.menuAndButton = menuAndButton;

        }
    },
    [UNSET_MENUANDBUTTON](state, menuAndButton) {
        sessionStorage.removeItem('menuAndButtons');
        state.menuAndButton = [];
    }
};
const actions = {
    [SET_MENU]({commit}, menu) {
        commit(SET_MENU, menu);
    },
    [UNSET_MENU]({commit}) {
        commit(UNSET_MENU);
    },
    [SET_MENUANDBUTTON]({commit}, menuAndButton) {
        commit(SET_MENUANDBUTTON, menuAndButton);
    },
    [UNSET_MENUANDBUTTON]({commit}) {
        commit(UNSET_MENUANDBUTTON);
    }
};
const getters = {
    getMenu: (state) => state.sidebarMenu,
    getMenuAndButton: (state) => state.menuAndButton
};

export default{
    state,
    mutations,
    actions,
    getters
}

