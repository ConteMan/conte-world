<template>
    <div class="container">
        <div class="nav-item">Talk</div>
        <div class="nav-item">Think</div>
        <div class="nav-item">About</div>
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
    .nav-item:last-of-type {
        border-bottom: none;
    }
</style>