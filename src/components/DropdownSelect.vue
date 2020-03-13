<template>
    <div class="select" ref="select">
        <span class="label" @click="show = !show" :class="{ active : show }">{{ name }}</span>
        <div class="options" v-if="show">
            <div v-for="(option, index) in options" class="item" :key="option.value" @click="updateOptions(index)">
                <span class="check" :class="{on : option.status}"></span>
                <span class="text">{{ option.title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        options: Array
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        updateOptions: function(index){
            this.options.forEach((option) => {
                option.status = false
            })
            this.options[index].status = !this.options[index].status
            this.$emit('changeName', this.options[index])
            this.show = false
        }
    },
    created: function() {
        window.addEventListener('click', (e) => {
            if (this.show && !this.$refs.select.contains(e.target)){
                this.show = false
            }
        })
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/base/colors';
@import '../styles/base/fonts';

.select {
    position: relative;
    .label {
        border-bottom: 1px solid #c8c8c8;
        height: 30px;
        padding-right: 50px;
        display: flex;
        align-items: center;
        position: relative;
        color: $blue;
        cursor: pointer;
        font-size: 16px;
    }
    .label::after {
        content: '';
        position: absolute;
        top: 10px; right: 0;
        font-family: 'front-end-test';
        content: '\61';
        pointer-events: none;
        font-size: 13px;
        color: #9b9b9b;
    }
    .label.active::after {
        content: '\62';
    }
    .options {
        position: absolute;
        top: 30px;
        left: 0;
        background: #FFF;
        border: 1px solid #c8c8c8;
        box-shadow: 0 10px 10px rgba(0,0,0,.1);
        padding: 5px 5px;
        z-index: 2;
        .item {
            display: flex;
            align-items: center;
            white-space: nowrap;
            padding: 10px 10px;
            font-size: 14px;
            cursor: pointer;
            .check {
                display: inline-block;
                width: 15px;
                height: 15px;
                border: 1px solid #DDD;
                border-radius: 100px;
                margin-right: 10px;
                position: relative;
            }
            .check.on::after {
                font-family: 'front-end-test';
                content: '\67';
                font-size: 8px;
                position: absolute;
                width: 16px;
                height: 16px;
                top: -1px;
                left: -1px;
                background: #000;
                color: #FFF;
                border-radius: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1px 0 0 1px;
            }
        }
        .item:hover {
            background: #f5f5f5;
        }
    }
}

</style>