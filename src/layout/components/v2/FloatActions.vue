<template>
    <div class="container">
        <div class="item">
            <a-button icon="menu" @click="menuAction"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import { mixin } from '@/utils/mixin'

    export default {
        name: "FloatActions",
        data() {
            return {
                drawer: false,
            }
        },
        computed: {
            ...mapGetters(
                {
                    accessToken: 'accessToken'
                }
            ),
        },
        mixins: [ mixin ],
        methods: {
            ...mapMutations({
                menuAction: 'MENU_ACTION',
            }),
            drawerClose() {
                this.drawer = false
            },
            showDrawer() {
                this.drawer = true
            },
        }
    }
</script>

<style scoped lang="less">
    .container {
        position: fixed;
        bottom: 64px;
        right: 16px;
        height: max-content;
        z-index: 9999;
        .item {
            margin: 10px 0 0 0;
        }
    }
</style>
