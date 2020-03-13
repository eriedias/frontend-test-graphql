<template>
    <div class="toggle" :class="{active : active}" @click="toggle()">
        <span class="status"></span>
    </div>
</template>

<script>
export default {
    props: {
        active: Boolean
    },
    data() {
        return {
        }
    },
    methods: {
        toggle() {
            this.$emit('toggle', !this.active)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/base/colors';
.toggle {
    width: 40px;
    height: 10px;
    background: #e6e6e6;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    .status {
        transition: .2s ease-out;
        position: absolute;
        top: -5px;
        left: 0;
        height: 20px;
        width: 20px;
        background: #969696;
        border-radius: 100px;
    }
}
.toggle.active {
    .status {
        background: $green;
        left: 20px;
    }
}
</style>