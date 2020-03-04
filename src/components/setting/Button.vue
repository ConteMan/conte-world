<template>
    <div>
        <div class="setting">
            <a-icon type="setting" @click="showSettingDrawer"/>
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
        name: "Button"
    }
</script>

<style scoped>

</style>