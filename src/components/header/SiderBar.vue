<template>
    <div class="container">
        <div class="nav-item"> <router-link :to="{name: 'Index'}">主页</router-link></div>
        <div class="nav-item"><router-link :to="{name: 'About'}">关于</router-link></div>
    </div>
</template>

<script>
    export default {
        name: "SiderBar"
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    .container {
        padding: 10px 0;
    }
    .nav-item {
        width: fit-content;
        font-size: 12px;
        padding: 15px 0;
        border-bottom: 1px solid @border-color;
    }
    .nav-item > a {
        color: @font-color-grey;
    }
    .nav-item:hover > a {
        color: red;
    }
    .nav-item:last-of-type {
        border-bottom: none;
    }
</style>