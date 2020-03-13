<template>
    <div class="select" ref="select">
        <span class="label" @click="optionsCollapse()" :class="{ active : show }">{{ selectedObject.title }}</span>
        <div class="options" :class="{on : show}" ref="mobileSelectOptions">
            <div v-for="(option, index) in options" class="item" :key="index" @click="updateOptions(index)">
                <span class="check" :class="{on : option.status}"></span>
                <span class="text">{{ option.title }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: Array,
        selected: String
    },
    data() {
        return {
            show: false,
            selectedObject: {}
        }
    },
    methods: {
        updateOptions: function(index){
            this.options.forEach((option) => {
                option.status = false
            })
            this.options[index].status = !this.options[index].status
            this.selectedObject = this.options[index]
            this.$emit('update', this.options[index])
        },
        optionsCollapse: function(){
            this.show = !this.show
            let el = this.$refs.mobileSelectOptions
            if (el.style.maxHeight){
                el.style.maxHeight = null
                el.style.marginTop = '0'
            } else {
                el.style.maxHeight = el.scrollHeight + "px"
                el.style.marginTop = '20px'
            }
        }
    },
    created: function() {
        let trueOptions = this.options.filter((option) => { return option.status == true })
        if (trueOptions.length == 0){
            this.options[0].status = true
            this.selectedObject = this.options[0]
            this.$emit('selected')
        } else {
            this.$emit('selected')
            this.selectedObject = trueOptions[0]
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
@import '../styles/base/fonts';

.collapse-enter-active, .collapse-leave-active {
    max-height: 200px;
    transition: height .5s;
}
.collapse-enter, .collapse-leave-to {
    max-height: 0;
}

.select {
    position: relative;
    .label {
        height: 15px;
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
        top: 3px; right: 0;
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
        background: #FFF;
        overflow: hidden;
        max-height: 0;
        transition: .5s;
        .item {
            display: flex;
            align-items: center;
            white-space: nowrap;
            padding: 10px 0;
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