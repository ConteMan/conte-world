<template>
    <div>
        <!-- v1 版 -->
        <div v-if="layoutVersion == 'v1'" class="c-root">
            <div class="c-container">
                <div class="c-header" v-if="!isDrawer">
                    <div class="c-header-content">
                        <div class="title">
                            {{ $config.siteName }}
                        </div>
                        <sider-bar/>
                        <tool-bar/>
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
                            <tool-bar/>
                        </div>
                    </div>
                </a-drawer>
                <div class="trigger" v-if="isDrawer" @click="()=> {this.drawerVisible = true}">
                    <div class="trigger-content">
                        <a-icon class="trigger-icon" type="double-right" style="font-size: 18px; margin: 20px 0 0 0;"/>
                    </div>
                </div>
                <div class="c-main" :class="{ 'full-width': widthType > 1 }">
                    <router-view/>
                    <foot-bar/>
                </div>
                <div class="c-right-bar">
                    <div class="c-rb-content">
                    </div>
                </div>
            </div>
        </div>

        <!-- v2 版 -->
        <template v-if="layoutVersion == 'v2'">
            <float-actions/>
            <div v-if="!isDrawer" class="v2-container">
                <div v-if="menuStatus" class="v2-sider-container">
                    <sider-bar/>
                </div>
                <div class="v2-content-container" :class="{ 'full-width': widthType > 1 , 'no-menu': !menuStatus}">
                    <router-view/>
                    <v2-footer/>
                </div>
            </div>
            <div v-else  class="v2-container">
                <a-drawer
                    placement="left"
                    wrapClassName="siderbar-drawer"
                    :closable="false"
                    :visible="menuStatus"
                    width="40%"
                    @close="drawerClose"
                >
                    <sider-bar/>
                </a-drawer>
                <div class="v2-content-container no-menu">
                    <router-view/>
                    <v2-footer/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import SiderBar from "@/components/header/SiderBar";
    import FootBar from "@/layout/components/v1/FootBar"
    import ToolBar from "@/layout/components/v1/ToolBar"

    import V2Header from "@/layout/components/v2/Header"
    import FloatActions from "@/layout/components/v2/FloatActions"
    import V2Footer from "@/layout/components/v2/Footer"
    import {
        MENU_ACTION,
    } from '@/store/mutation-types'
    import { mixin } from '@/utils/mixin'
    import {mapMutations} from "vuex"

    export default {
        name: "BaseLayout",
        components: {
            SiderBar,
            FootBar,
            ToolBar,

            FloatActions,
            V2Header,
            V2Footer,
        },
        data() {
            return {
                fullWidth: document.body.clientWidth,
                timer: false,
                drawerVisible: false,
                menuVisible: true,
            }
        },
        mixins: [mixin],
        computed: {
            isDrawer: function() {
                return this.fullWidth <= 768;
            },
            isPC: function () {
                return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
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
                        }, 400)
                }
            }
        },
        methods: {
            drawerClose() {
                this.menuAction(false)
            },
            ...mapMutations({
                menuAction: 'MENU_ACTION',
            })
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
    @import "~@/style/variables";

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
            border-left:  1px solid @border-color;

            .title {
                text-align: center;
                font-size: 16px;
                font-weight: 600;
                padding: 20px 20px 10px;
                border-bottom: 1px solid @border-color;
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

    .v2-trigger {
        position: fixed;
        width: 100px;
        text-align: center;
        z-index: 9999;
        .trigger-icon {
            font-size: 20px;
            line-height: 55px;
            cursor: pointer;
        }
    }
    .v2-container {
        height: 100%;
        .v2-sider-container {
            position: fixed;
            height: 100%;
            width: 100px;
            margin: 0;
            border-right: 1px solid @border-color;
            text-align: center;
            .nav-container {
                display: block;
                height: calc(100% - 55px);
                text-align: center;
                margin-top: 55px;
                padding: 20px;
                /deep/ .nav-item {
                    margin: 0;
                    width: 100% !important;
                }
            }
        }
        .v2-content-container {
            position: relative;
            margin: 0 0 0 100px;
            div:first-child {
                min-height: 100vh;
            }
        }
        .v2-content-container.no-menu {
            margin: 0;
        }
    }

</style>
