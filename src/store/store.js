import Vue from 'vue'
import Vuex from 'vuex'

import listStore from '../modules/list/listStore'
import filterStore from './filterStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        detailsModalOpen: false,
    },
    modules: {
        listStore,
        filterStore
    },
    mutations: {
        CHANGE_IS_LOADING(state, value) {
            state.isLoading = value
        },
    },
    actions: {
        updateIsLoading({commit}, value){
            commit('CHANGE_IS_LOADING', value)
        },
    }
})