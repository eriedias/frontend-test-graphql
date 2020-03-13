import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const URL_BASE = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/'

export const axiosRequest = axios.create({
    baseURL: URL_BASE,
    timeout: 30000,
    maxContentLength: 5242880,
    withCredentials: false,
    headers: {
        Authorization: 'Bearer ' + process.env.VUE_APP_YELP_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

Vue.use(VueAxios, axiosRequest)

export const BUSINESS_SEARCH = 'businesses/search'
export const CATEGORIES = 'categories'