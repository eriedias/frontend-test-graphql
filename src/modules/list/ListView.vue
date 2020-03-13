<template>
    <div>

        <!-- Main Header -->
        <header id="main-header">
            <div class="container">
                <h1>Restaurants</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique lorem sed mauris laoreet hendrerit.</p>
            </div>
        </header>

        <!-- Main Filter -->
        <aside class="main-filter">
            <div class="container flex-middle">
                <desktop-filter v-if="windowSize.width > 767"></desktop-filter>
                <mobile-filter v-else></mobile-filter>
            </div>
        </aside>
        
        
        <!-- Restaurants List -->
        <section class="restaurants-list">

            <div class="container" v-if="loadedWithoutResults">
                <h2 class="list-title">No restaurants found near you.</h2>
            </div>

            <div class="container" v-else>
                <h2 class="list-title">All Restaurants</h2>
                <ul class="list">

                    <li class="item" v-for="(item, index) in list" v-bind:key="index">
                        <figure>
                            <img :src="item.image_url">
                        </figure>
                        <div class="description">
                            <h3 class="item-title">{{ item.name }}</h3>
                            <div class="rating">
                                <span class="icon-full-star star" v-for="fullstar in Math.floor(item.rating)" v-bind:key="'fullstar-'+fullstar"></span>
                                <span class="icon-half-star star" v-if="item.rating % 1 !== 0"></span>
                                <span class="icon-empt-star star" v-for="emptstar in Math.floor(5 - item.rating)" v-bind:key="'emptstar-'+emptstar"></span>
                            </div>
                            <div class="end-bar">
                                <div class="food-and-price">
                                    <span class="food-type">
                                        <!-- All categories -->
                                        <!--
                                        <span v-for="(categ, index) of item.categories" v-bind:key="index">{{ categ.title }}<span v-if="index != Object.keys(item.categories).length - 1">, </span></span>
                                        -->
                                        <!-- Just one category -->
                                        <span>{{ item.categories[0].title }}</span>
                                    </span>
                                    •
                                    <span class="price">{{ item.price }}</span>
                                </div>
                                <div class="status">
                                    <!-- The Yelp API listing endpoint does not provide a parameter for open restaurants. -->
                                    <!-- Using "is_closed" below, but this parameter is for restaurants that has been permanently closed. -->
                                    <!-- I'll resolve this using GraphiQL. -->
                                    <span class="icon-circle icon" :class="[item.is_closed ? 'close' : 'open']"></span>
                                    <span class="text close" v-if="item.is_closed">Close</span>
                                    <span class="text open" v-else>Open <span v-if="windowSize.width > 767">Now</span></span>
                                </div>
                            </div>
                            <div class="learn-more-link" v-if="windowSize.width <= 767">
                                <span class="link" @click="showDetails(item.id)"><span class="text">Learn More</span><span class="icon icon-long-arrow-right"></span></span>
                            </div>
                        </div>
                        <button class="learn-more-button" v-if="windowSize.width > 767" @click="showDetails(item.id)">
                            Learn More
                        </button>
                    </li>

                </ul>

                <div class="load-more">
                    <button class="outline-button" @click="loadMore()">Load more</button>
                </div>
            </div>

        </section>

        <transition name="fade">
            <details-modal v-if="this.$store.state.detailsModalOpen" @closemodal="$store.state.detailsModalOpen = false"></details-modal>
        </transition>

        <div class="vld-parent">
            <loading :active.sync="this.$store.state.isLoading" :color="'#FFF'" :background-color="'#002b56'" :opacity="0.7" :width="100" :height="100"></loading>
        </div>

    </div>
</template>

<script src='./list.js'></script>