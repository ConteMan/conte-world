<template>
    <div>
        <div class="tool-container">
            <a-button class="btn" shape="circle" icon="user" size="small" @click="$router.push({name: 'Login'})"></a-button>
            <a-button class="btn" shape="circle" icon="poweroff" size="small" @click="$router.push({name: 'Logout'})"></a-button>
            <a-button class="btn" shape="circle" icon="setting" size="small"></a-button>
        </div>

        <a-drawer
            placement="right"
            wrapClassName="setting-drawer"
            :closable="false"
            :visible="settingDrawerVisible"
            @close="drawerClose"
        >
            <div class="list-container">
                <div class="title">基础</div>
                <div class="item">
                    <div class="content">
                        宽屏
                    </div>
                    <div class="operation">
                        <a-switch size="small" :defaultChecked="setting.fullWidth" @change="widthSetting"/>
                    </div>
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script>
    export default {
        name: "ToolBar",
        data() {
            return {
                settingDrawerVisible: false,

                settingKey: 'Isconte-Setting',
                setting: {},
            }
        },
        method() {

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