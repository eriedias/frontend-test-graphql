import DesktopFilter from '../../components/DesktopFilter.vue'
import MobileFilter from '../../components/MobileFilter.vue'
import DetailsModal from '../../components/DetailsModal.vue'
import windowSize from '../../mixins/windowSize'

import { mapActions } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import ApolloClient, { gql } from 'apollo-boost';

export default {
    components: { 
        'desktop-filter': DesktopFilter,
        'mobile-filter': MobileFilter,
        'details-modal': DetailsModal,
        'loading': Loading
    },
    mixins: [windowSize],
    mounted() {
        this.to_clean_list()
        this.to_list(this.$store.state.filterStore.filter)





        const apolloClient = new ApolloClient({
            uri: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/graphql',
            headers: {
                Authorization: 'Bearer ' + process.env.VUE_APP_YELP_API_KEY,
                'Accept-Language': 'en_US',
            }
        })
        apolloClient.query(
            {
                query: gql`
                    { 
                        search(location: "las vegas",) { business { name url } } 
                    }                  
                `
            }
        ).then(response => {
            console.log(response.data)
        }).catch(error => error);


        


    },
    methods: {
        ...mapActions('listStore', ['to_list', 'to_detail', 'to_clean_list']),

        showDetails(id){
            return new Promise (() => { 
                this.to_detail(id)
                .then(() => {
                    this.$store.state.detailsModalOpen = true
                })
                .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(error))
                })
            })
        },

        loadMore(){
            this.to_list(this.$store.state.filterStore.filter)
        }
    },
    computed: {
        list: {
            get () {
                return this.$store.state.listStore.list
            }
        },
        loadedWithoutResults: {
            get () {
                return this.$store.state.listStore.loadedWithoutResults
            }
        }
    },
}