<template>
    <div class="filter-component">

        <div class="title">Filter By:</div>
        <div class="form-item">
            <div class="custom-checkbox">
                <label>
                    <input type="checkbox" :checked="this.filterStore.filter.onlyOpenNow" @change="changeOnlyOpenNow($event.target.checked)">
                    <span class="checkmark"></span>
                    <span class="radio-text">Open Now</span>
                </label>
            </div>
        </div>
        <dropdown-select :name="this.filterStore.filter.price.title" :options="this.filterStore.prices" class="dropdown-select" @changeName="selectPrice($event)"></dropdown-select>
        <dropdown-select :name="this.filterStore.filter.category.title" :options="this.filterStore.categories" class="dropdown-select" @changeName="selectCategory($event)"></dropdown-select>
        <button class="outline-button x-small-button clear-button" :class="[JSON.stringify(this.filterStore.filter) === JSON.stringify(this.filterStore.defaultFilter) ? 'disabled' : '']" @click="resetFilter()">Clear all</button>

    </div>
</template>

<script>
import DropdownSelect from './DropdownSelect.vue'

import { mapActions } from 'vuex'

export default {
    components: { 'dropdown-select': DropdownSelect },
    data() {
        return {
            filterStore: this.$store.state.filterStore
        }
    },
    mounted() {
        
    },
    methods: {
        ...mapActions('filterStore', ['updateFilterPriceState', 'updateFilterCategoryState', 'updateFilterOnlyOpenNowState', 'clearFilter']),
        ...mapActions('listStore', ['to_list', 'to_clean_list']),

        changeOnlyOpenNow(value){
            this.updateFilterOnlyOpenNowState(value)
            this.to_clean_list()
            this.to_list(this.filterStore.filter)
        },
        selectPrice(price){
            this.updateFilterPriceState(price)
            this.to_clean_list()
            this.to_list(this.filterStore.filter)
        },
        selectCategory(category){
            this.updateFilterCategoryState(category)
            this.to_clean_list()
            this.to_list(this.filterStore.filter)
        },
        resetFilter(){
            if (JSON.stringify(this.filterStore.filter) !== JSON.stringify(this.filterStore.defaultFilter)) {
                this.clearFilter()
                this.to_clean_list()
                this.to_list(this.filterStore.filter)
                this.filterStore.prices.forEach((option) => {
                    option.status = false
                })
                this.filterStore.categories.forEach((option) => {
                    option.status = false
                })
                this.filterStore.prices[0].status = true
                this.filterStore.categories[0].status = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.filter-component {
    width: 100%;
    display: flex;
    align-items: center;
    .dropdown-select {
        margin-right: 30px;
    }
    .title {
        width: 100px;
    }
    .form-item {
        margin-right: 30px;
    }
    .clear-button {
        margin-left: auto;
    }
}
</style>