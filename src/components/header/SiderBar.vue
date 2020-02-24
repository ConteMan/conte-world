<template>
    <div class="nav-container">
        <div class="nav-item" :class="{ active: item.active }" v-for="item in routes"><router-link :to="{name: item.name}">{{ item.meta.title }}</router-link></div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: "SiderBar",
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(
                {
                    routes: 'routes'
                }
            ),
        },
        mounted() {
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    .nav-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px 0;
        .nav-item {
            width: fit-content;
            font-size: 12px;
            padding: 15px 0;
            margin: 0 24px 0 0;
            border-bottom: 1px solid @border-color;
        }
        .nav-item > a {
            color: @font-color-grey;
            text-decoration: none;
        }
        .nav-item:hover > a {
            color: @red;
        }
        .nav-item:focus > a {
            text-decoration: none;
        }
        .nav-item:last-of-type {
            //border-bottom: none;
        }
        .nav-item.active > a {
            font-weight: @font-bold;
            color: @red;
        }
    }
</style>