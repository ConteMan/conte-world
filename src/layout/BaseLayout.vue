<template>
    <div class="c-root">
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
</template>

<script>
    import VueDraggableResizable from 'vue-draggable-resizable'
    import SiderBar from "@/components/header/SiderBar";
    import FootBar from "@/layout/components/FootBar"
    import ToolBar from "@/layout/components/ToolBar"
    import { mixin } from '@/untils/mixin'

    export default {
        name: "BaseLayout",
        components: {
            VueDraggableResizable,
            SiderBar,
            FootBar,
            ToolBar
        },
        data() {
            return {
                fullWidth: document.body.clientWidth,
                timer: false,
                drawerVisible: false,
            }
        },
        mixins: [mixin],
        computed: {
            isDrawer: function() {
                return this.fullWidth < 736;
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
        },
        // watch: {
        //   widthType(old){
        //     console.log(old)
        //   }
        // },
        methods: {
            drawerClose() {
                this.drawerVisible = false
            },
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
</style>