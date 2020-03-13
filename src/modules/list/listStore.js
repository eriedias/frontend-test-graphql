import { axiosRequest, BUSINESS_SEARCH } from '../../utils/Requests'

export default {
    namespaced: true,
    state: {
        list: [],
        businessInModal: {},
        reviewsInModal: [],
        loadedWithoutResults: false,
    },
    mutations: {
        CHANGE_LIST(state, payload) {
            if (state.list.length > 0){
                state.list = state.list.concat(payload.businesses)
            }
            else {
                state.list = payload.businesses
            }
        },
        CLEAN_LIST(state){
            state.list = []
        },
        LOADED_WITHOUT_RESULTS(state, payload) {
            state.loadedWithoutResults = payload
        },
        CHANGE_BUSINESS_MODAL(state, payload) {
            state.businessInModal = payload
        },
        CHANGE_REVIEWS_MODAL(state, payload) {
            state.reviewsInModal = payload.reviews
        },
    },
    actions: {
        to_list({ dispatch, commit, state, /*rootState*/ }, filter) {
            return new Promise ((resolve, reject) => {
                dispatch('updateIsLoading', true, { root: true })
                axiosRequest.get(BUSINESS_SEARCH,
                {
                    params: {
                        location: 'Las Vegas',
                        price: filter.price.value,
                        categories: filter.category.value,
                        open_now: filter.onlyOpenNow,
                        offset: state.list.length
                    }
                }
                ).then(response => {
                    if (response.data) {
                        commit('CHANGE_LIST', response.data)
                        state.list.length == 0 ? commit('LOADED_WITHOUT_RESULTS', true) : commit('LOADED_WITHOUT_RESULTS', false)
                        resolve(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    } else {
                        reject(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(JSON.stringify(error))
                })
            })
        },

        to_clean_list({ commit }){
            commit('CLEAN_LIST')
        },

        to_detail({ dispatch, commit }, id) {
            return new Promise ((resolve, reject) => {
                dispatch('updateIsLoading', true, { root: true })
                axiosRequest.get('businesses/'+id,
                ).then(response => {
                    if (response.data) {
                        dispatch('to_reviews', response.data.id)
                        commit('CHANGE_BUSINESS_MODAL', response.data)
                        resolve(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    } else {
                        reject(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(JSON.stringify(error))
                })
            })
        },

        to_reviews({ dispatch, commit }, id) {
            return new Promise ((resolve, reject) => {
                dispatch('updateIsLoading', true, { root: true })
                axiosRequest.get('businesses/'+id+'/reviews'
                ).then(response => {
                    if (response.data) {
                        commit('CHANGE_REVIEWS_MODAL', response.data)
                        resolve(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    } else {
                        reject(
                            dispatch('updateIsLoading', false, { root: true })
                        )
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(JSON.stringify(error))
                })
            })
        }

    }
}