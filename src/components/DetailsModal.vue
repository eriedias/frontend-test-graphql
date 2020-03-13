<template>
    <div class="details-modal">

        <div class="container">
            <div class="modal" ref="modal">

                <header class="modal-header">
                    <h2 class="title">{{ listStore.businessInModal.name }}</h2>
                    <div class="rating">
                        <span class="icon-full-star star" v-for="fullstar in Math.floor(listStore.businessInModal.rating)" v-bind:key="'fullstar-'+fullstar"></span>
                        <span class="icon-half-star star" v-if="listStore.businessInModal.rating % 1 !== 0"></span>
                        <span class="icon-empt-star star" v-for="emptstar in Math.floor(5 - listStore.businessInModal.rating)" v-bind:key="'emptstar-'+emptstar"></span>
                    </div>
                    <div class="end-bar">
                        <div class="food-and-price">
                            <span class="food-type">
                                <span>{{ listStore.businessInModal.categories[0].title }}</span>
                            </span>
                            •
                            <span class="price">{{ listStore.businessInModal.price }}</span>
                        </div>
                        <div class="status">
                            <span class="icon-circle icon" :class="[listStore.businessInModal.hours[0].is_open_now ? 'open' : 'close']"></span>
                            <span class="text" v-if="listStore.businessInModal.hours[0].is_open_now">Open Now</span>
                            <span class="text" v-else>Close</span>
                        </div>
                    </div>
                </header>

                <section class="map-and-photos">
                    <div class="flex">
                        <div class="item map">
                            <GmapMap
                                :center="businessCoordinates"
                                :zoom="15" map-type-id="terrain" style="width: 100%; height: 230px"
                                >
                                <GmapCustomMarker :marker="businessCoordinates" class="gmap-custom-marker">
                                    <div class="map-marker">
                                        <figure><img :src="listStore.businessInModal.photos[0]"></figure>
                                        <span class="icon icon-pin"></span>
                                    </div>
                                </GmapCustomMarker>
                            </GmapMap>
                            <p class="address"><span v-for="item in listStore.businessInModal.location.display_address" v-bind:key="item">{{ item }}</span></p>
                        </div>
                        <div class="item photo-list" :ref="windowSize.width <= 767 ? 'photoslide' : ''">
                            <figure class="photo">
                                <img :src="listStore.businessInModal.photos[0]">
                            </figure>
                            <figure class="photo">
                                <img :src="listStore.businessInModal.photos[1]">
                            </figure>
                            <figure class="photo" v-if="windowSize.width <= 767">
                                <img :src="listStore.businessInModal.photos[2]">
                            </figure>
                        </div>
                    </div>
                </section>

                <section class="reviews">
                    <p class="total">{{ listStore.businessInModal.review_count }} Reviews</p>
                    <div class="item" v-for="review in listStore.reviewsInModal" v-bind:key="review.id">
                        <div class="user">
                            <figure>
                                <img :src="review.user.image_url">
                            </figure>
                            <div class="name-and-date">
                                <span class="name">{{ review.user.name }}</span>
                                <span class="date">{{ review.time_created.substring(0,10) }}</span>
                            </div>
                        </div>
                        <div class="text-and-rating">
                            <div class="review-rating">
                                <span class="icon-full-star star"></span>
                                <span class="icon-full-star star"></span>
                                <span class="icon-full-star star"></span>
                                <span class="icon-full-star star"></span>
                                <span class="icon-full-star star"></span>
                            </div>
                            <div class="text">
                                {{ review.text }}
                            </div>
                        </div>
                    </div>
                </section>

                <div class="buttons">
                    <button class="outline-button" @click="closemodal()">Close</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import windowSize from '../mixins/windowSize'

export default {
    components: {
        GmapCustomMarker
    },
    mixins: [windowSize],
    props: {
        modalopen: Boolean
    },
    data() {
        return {
            listStore: this.$store.state.listStore,
            businessCoordinates: {
                lat:this.$store.state.listStore.businessInModal.coordinates.latitude, 
                lng:this.$store.state.listStore.businessInModal.coordinates.longitude
            }
        }
    },
    methods: {
        closemodal(){
            this.$emit('closemodal')
        }
    },
    mounted: function() {
        /*
        window.addEventListener('click', (e) => {
            // TypeError: _this.$refs.modal is undefined
            if (this.$store.state.detailsModalOpen && !this.$refs.modal.contains(e.target)){
                this.$emit('closemodal')
            }
        }),
        */
        window.addEventListener('keydown', (e) => {
            if (this.$store.state.detailsModalOpen && e.key == 'Backspace') {
                this.$emit('closemodal')
            }
        });

        // Mobile photo slide        
        var x,y,newX,newY,top,left,down,eventTypeDown,eventTypeMove,eventTypeUp
        var isMobile = false
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = true
        }
        if(isMobile) {
            eventTypeDown = 'touchstart'
            eventTypeMove = 'touchmove'
            eventTypeUp = 'touchend'
        } else {
            //If its not a mobile device use mouse
            eventTypeDown = 'mousedown'
            eventTypeMove = 'mousemove'
            eventTypeUp = 'mouseup'
        }
        window.addEventListener(eventTypeDown, (e) => {
            if (this.$refs.photoslide && this.$refs.photoslide.contains(e.target)){
                //alert(e.changedTouches[0].pageX)
                down = true;
                if(isMobile) {
                    x = e.changedTouches[0].pageX
                    y = e.changedTouches[0].pageY
                } else {
                    x = e.pageX;
                    y = e.pageY;
                }
                top = this.$refs.photoslide.scrollTop;
                left = this.$refs.photoslide.scrollLeft;
            }
        })
        window.addEventListener(eventTypeMove, (e) => {
            if(down && this.$refs.photoslide){
                if(isMobile) {
                    newX = e.changedTouches[0].pageX;
                    newY = e.changedTouches[0].pageY;
                } else {
                    newX = e.pageX;
                    newY = e.pageY;
                }
                this.$refs.photoslide.scrollTop = top - newY + y;    
                this.$refs.photoslide.scrollLeft = left - newX + x;
            }
        })

        window.addEventListener(eventTypeUp, () => {
            down = false
        })
        
    },
}
</script>