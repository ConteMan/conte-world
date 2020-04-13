<template>
    <div class="container">
        <div class="item">
            <a-button icon="home" @click="() => { this.$router.push({ name: 'Main' })}"/>
        </div>
        <div class="item">
            <a-button icon="menu" @click="menuAction"/>
        </div>
        <div v-if="!accessToken" class="item">
            <a-button icon="login" @click="() => { this.$router.push({ name: 'Login' })}"/>
        </div>
        <div v-else class="item">
            <a-button icon="logout" @click="() => { this.$router.push({ name: 'Logout' })}"/>
        </div>
        <div class="item">
            <a-button icon="setting" @click="() => { this.drawer = true }"/>
        </div>
        <a-drawer
            placement="right"
            wrapClassName="setting-drawer"
            :closable="false"
            :visible="drawer"
            @close="drawerClose"
        >
            <div class="list-container">
                <div class="title">基础</div>
                <div class="item">
                    <div class="content">
                        宽屏
                    </div>
                    <div class="operation">
                        <a-switch size="small" :defaultChecked="widthType > 1" @change="widthTypeChange"/>
                    </div>
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {
        ACCESS_TOKEN,
        MENU_ACTION,
        WIDTH_TYPE
    } from '@/store/mutation-types'
    import { mixin } from '@/untils/mixin'

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
        mixins: [mixin],
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
            widthTypeChange(checked) {
                this.$store.commit(WIDTH_TYPE, checked ? 2 : 1)
            }
        }
    }
</script>

<style scoped lang="less">
    .container {
        position: fixed;
        bottom: 65px;
        right: 20px;
        height: max-content;
        z-index: 999;
        .item {
            margin: 10px 0 0 0;
        }
    }
</style>