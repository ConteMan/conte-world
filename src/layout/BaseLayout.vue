<template>
    <div class="c-root">
        <div class="c-container">
            <div class="c-header" v-if="!isDrawer">
                <div class="c-header-content">
                    <div class="title">
                        {{ $config.siteName }}
                    </div>
                    <sider-bar/>
                    <div class="footer">
                        ©{{ $config.siteCreateTime }} - {{ $dayjs().format('YYYY') }} <br>
                        <div class="beian">
                            <a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a>
                        </div>
                        <br>
                        <div class="beian">
                            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702002732">{{ $config.policeBeian }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <a-drawer
                v-else
                placement="left"
                wrapClassName="siderbar-drawer"
                :closable="false"
                :visible="drawerVisible"
                @close="drawerClose"
            >
                <div class="c-header">
                    <div class="c-header-content">
                        <div class="title">
                            {{ $config.siteName }}
                        </div>
                        <sider-bar/>
                        <div class="footer">
                            ©{{ $config.siteCreateTime }} - {{ $dayjs().format('YYYY') }} <br>
                            <div class="beian">
                                <a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a>
                            </div>
                            <br>
                            <div class="beian">
                                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702002732">{{ $config.policeBeian }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </a-drawer>
            <div class="trigger" v-if="isDrawer" @click="()=> {this.drawerVisible = true}">
                <div class="trigger-content">
                    <a-icon class="trigger-icon" type="double-right" style="font-size: 18px; margin: 20px 0 0 0;"/>
                </div>
            </div>
            <div class="c-main" :class="{ 'full-width': setting.fullWidth }">
                <router-view/>
            </div>
            <div class="c-right-bar">
                <div class="c-rb-content"></div>
            </div>
        </div>

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
    import Cookies from "js-cookie"
    import SiderBar from "@/components/header/SiderBar";

    export default {
        name: "BaseLayout",
        components: {
            SiderBar,
        },
        data() {
            return {
                fullWidth: document.body.clientWidth,
                timer: false,
                drawerVisible: false,
                settingDrawerVisible: false,

                settingKey: 'Isconte-Setting',
                setting: {},
            }
        },
        computed: {
            isDrawer: function() {
                return this.fullWidth < 736;
            }
        },
        watch: {
            setting: {
                handler (n, o) {
                    Cookies.set(this.settingKey, n)
                },
                deep: true
            }
        },
        mounted() {
            window.onresize = () => {
                if(!this.timer) {
                    this.timer = true
                    setTimeout(
                        () => {
                            this.fullWidth = document.body.clientWidth
                            this.timer = false
                        },
                        400
                    )
                }
            }

            let cookieSetting = Cookies.get(this.settingKey)
            if (!cookieSetting) {
                this.setting = {
                    fullWidth: false,
                }
            } else {
                this.setting = JSON.parse(cookieSetting)
            }
        },
        methods: {
            drawerClose() {
                this.drawerVisible = false
                this.settingDrawerVisible = false
            },
            showSettingDrawer() {
                this.settingDrawerVisible = true
            },
            widthSetting(checked) {
                if (!this.setting) {
                    this.setting = {
                        fullWidth: checked,
                    }
                } else {
                    this.setting.fullWidth = checked
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            if (this.isDrawer && this.drawerVisible) {
                this.drawerVisible = false
            }
            next()
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/index";

    .c-root {
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .c-container {
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;

        display: flex;
        justify-content: center;

        padding: 0 20px;
    }
    .c-header {
        flex-grow: 1;
        align-items: flex-end;

        height: 100%;
        width: 100%;
        max-width: @sider-width;

        .c-header-content {
            width: 100%;
            height: 100%;
            max-width: @sider-width;
            position: fixed;
            border-right: 1px solid @border-color;

            .title {
                font-size: 16px;
                font-weight: 600;
                padding: 20px 0 10px;
                border-bottom: 1px solid @border-color;
            }

            .footer {
                color: @font-color-footer;
                font-size: 12px;
                position: absolute;
                bottom: 0;
                width: 100%;
                max-width: @sider-width;
                padding: 10px 0 10px;
                border-top: 1px solid @border-color;
                .beian {
                    line-height: 14px;
                    font-size: 12px;
                    display: inline-block;
                    margin: 5px 0 0 0;
                    color: @font-color-footer;
                    a:any-link {
                        color: @font-color-footer;
                    }
                }
            }
        }
    }
    .c-main {
        flex-grow: 1;
        align-items: flex-start;

        max-width:@main-width;
        height: 100%;
    }
    .c-main.full-width {
        max-width: unset;
    }
    .c-right-bar {
        flex-grow: 0;
        .c-rb-content {
            width: 100%;
            height: 100%;
            max-width: 1px;
            position: fixed;
            border-left: 1px solid @border-color;
        }
    }
    .siderbar-drawer {
        .c-header {
            width: 200px;
        }
        .c-header-content {
            border-right: none;
        }
    }
    .trigger {
        position: absolute;
        width: 20px;
        height: 100vh;
        left: 0;
        border: none;
        .trigger-content {
            height: 100%;
            width: 20px;
            position: fixed;
            border-right: 1px solid @border-color;
        }
        .trigger-icon {
            color: @grey;
        }
    }

    .setting {
        text-align: center;
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        font-size: 14px;
    }
</style>