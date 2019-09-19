<template>
    <div class="m-main">
        <div class="m-header">
            <slot name="header"></slot>
        </div>
        <div class="m-content" v-bind:class="{noborder:nborder}">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Module",
        props:{
            nborder: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>

<style scoped lang="stylus">
    .m-main
        height 100%
        width 100%
    .m-header
        height 2rem
        line-height 2rem
        color white
        font-size 14px
        font-weight bold
        background linear-gradient(rgb(0,20,30), rgb(0,40,70), rgb(0,40,70), rgb(0,20,30));
    .m-content
        text-align center
        height calc(100% - 2rem)
        border 1px solid cornflowerblue
        box-shadow 0 0 1rem rgba(100,200,255,.5) inset;
    .noborder
        border none
</style>