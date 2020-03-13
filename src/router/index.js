import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: __dirname,
    mode: 'history',

    routes: [
        { 
            path: "/",
            component: () => import('../modules/list/ListView.vue'),
            meta: { title: 'Restaurants' }
        },
        { 
            path: "/:title/:id",
            component: () => import('../modules/details/DetailsView.vue'),
        }
    ]
})

// Set title to pages
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router