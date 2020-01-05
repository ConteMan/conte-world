<template>
    <div class="c-root">
        <div class="c-container">
            <div class="c-header">
                <div class="c-header-content">
                    <div class="title">
                        {{ $config.siteName }}
                    </div>
                    <sider-bar/>
                    <one-card class="one" />
                    <div class="footer">
                        @2019 <span class="beian"><a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a></span>
                    </div>
                </div>
            </div>
            <div class="c-main">
            </div>
        </div>
    </div>
</template>

<script>
    import SiderBar from "@/components/header/SiderBar";
    import OneCard from "@/components/one/OneCard";

    export default {
        name: "index",
        components: {OneCard, SiderBar},
        compantents: {
            SiderBar,
            OneCard,
        }
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

            .title {
                font-size: 16px;
                font-weight: 600;
                padding: 20px 0 10px;
                border-bottom: 1px solid @border-color;
            }

            .one {
                padding: 10px 0;
                border-top: 1px solid @border-color;
            }

            .footer {
                width: 100%;
                max-width: @sider-width;
                padding: 10px 0 20px;
                border-top: 1px solid @border-color;

                .beian {
                    color: @font-color-grey;
                    margin-left: 5px;
                    a:any-link {
                        color: @font-color-grey;
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
        border-left: 1px solid @border-color;
        border-right: 1px solid @border-color;
    }
</style>