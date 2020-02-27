<template>
    <div class="nav-container">
        <div class="nav-item" :class="{ active: (item.active || item.name == $route.matched[0].name) }" v-for="item in routes" v-if="!item.hidden" @click="$router.push({name: item.name})">{{ item.meta.title }}</div>
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
            cursor: pointer;
        }
        .nav-item,.nav-item:focus {
            color: @font-color-grey;
        }
        .nav-item:hover {
            color: @red-60;
        }
        .nav-item.active {
            font-weight: @font-bold;
            color: @red;
            border-bottom: 1px solid red;
        }

    }
</style>