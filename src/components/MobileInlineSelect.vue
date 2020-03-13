<template>
    <div class="inline-select">
        <span class="item" v-for="(option, index) in options" :key="index" :class="{on : option.status}" @click="updateOptions(index)">{{ option.title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        options: Array
    },
    methods: {
        updateOptions: function(index){
            this.options.forEach((option) => {
                option.status = false
            })
            this.options[index].status = !this.options[index].status
            this.$emit('update', this.options[index])
        }
    },
    created: function() {
        let trueOptions = this.options.filter((option) => { return option.status == true })
        if (trueOptions.length == 0){
            this.options[0].status = true
            this.$emit('selected')
        } else {
            this.$emit('selected')
            trueOptions.forEach((option, index) => {
                if (index > 0){
                    option.status = false
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/base/colors';
.inline-select {
    display: flex;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        height: 38px;
        font-size: 13px;
        color: #000;
        box-sizing: border-box;
        cursor: pointer;
    }
    .item:nth-child(2n) {
        border-right: 1px solid #e6e6e6;
        border-left: 1px solid #e6e6e6;
    }
    .item:first-child {
        border-radius: 2px 0 0 2px;
    }
    .item:last-child {
        border-radius: 0 2px 2px 0;
        border-right: none;
    }
    .item.on, .item:hover {
        background: $blue;
        color: #FFF;
    }
    .item.on:nth-child(2n), .item:nth-child(2n):hover {
        border-right: 1px solid $blue;
        border-left: 1px solid $blue;
    }
}
</style>