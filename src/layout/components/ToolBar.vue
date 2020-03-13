<template>
    <div>
        <div class="tool-container">
            <a-button class="btn" shape="circle" icon="user" size="small" @click="$router.push({name: 'Login'})"></a-button>
            <a-button class="btn" shape="circle" icon="poweroff" size="small" @click="$router.push({name: 'Logout'})"></a-button>
            <a-button class="btn" shape="circle" icon="setting" size="small" @click="showDrawer"></a-button>
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
    import { mixin } from '@/untils/mixin'
    import { WIDTH_TYPE } from '@/store/mutation-types'

    export default {
        name: "ToolBar",
        data() {
            return {
                drawer: false,
            }
        },
        mixins: [mixin],
        methods: {
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
    @import "~@/style/variables";

    .tool-container {
        height: 55px;
        position: absolute;
        bottom: 0;
        width: @sider-width;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items:center;
        border-top: 1px solid @grey;
        .btn {
            margin-right: 8px;
            font-size: 12px;
        }
        .btn:nth-last-of-type(1) {
            margin-right: 0;
        }
    }
</style>