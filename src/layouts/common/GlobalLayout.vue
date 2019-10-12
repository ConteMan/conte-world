<template>
    <a-layout>
        <a-layout-header class="header">
            <slot name="header"></slot>
        </a-layout-header>
        <a-layout-content class="content">
            <slot name="content"></slot>
        </a-layout-content>
        <a-layout-footer class="footer">
            <slot name="footer"></slot>
        </a-layout-footer>
    </a-layout>
</template>

<script>
    export default {
        name: "GlobalLayout"
    }
</script>

<style scoped lang="less">
    .header{
        height: 4rem;
    }
    .content{
        min-height: calc(100vh - 8rem);
        padding: 0.2rem;
    }
    .footer{
        height: 4rem;
    }
</style>