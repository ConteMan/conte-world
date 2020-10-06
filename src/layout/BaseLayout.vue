<template>
  <div>
    <float-actions/>
    <div class="v2-container">
      <div v-if="menuStatus&&!isDrawer" class="v2-sider-container">
        <sider-bar/>
      </div>
      <a-drawer
        placement="left"
        wrapClassName="siderbar-drawer"
        :closable="false"
        :visible="menuStatus&&isDrawer"
        width="40%"
        @close="drawerClose"
      >
        <sider-bar/>
      </a-drawer>
      <div class="v2-content-container" :class="{ 'full-width': widthType > 1 , 'no-menu': !menuStatus || isDrawer, 'exist-menu': menuStatus && !isDrawer}">
        <router-view/>
        <v2-footer/>
      </div>
    </div>
  </div>
</template>

<script>
    import SiderBar from "@/components/header/SiderBar";
    import FloatActions from "@/layout/components/v2/FloatActions"
    import V2Footer from "@/layout/components/v2/Footer"

    import { mixin } from '@/utils/mixin'
    import { mapMutations } from "vuex"

    export default {
        name: "BaseLayout",
        components: {
            SiderBar,
            FloatActions,
            V2Footer,
        },
        data() {
            return {
                fullWidth: document.body.clientWidth,
                timer: false,
                drawerVisible: false,
            }
        },
        mixins: [ mixin ],
        computed: {
            isDrawer: function() {
                return this.fullWidth <= 768;
            },
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
            if (this.isDrawer) {
              this.menuAction(false)
            }
            next()
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

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
        }
        .v2-content-container {
            position: relative;
            margin: 0 0 0 100px;
            div:first-child {
                min-height: 100vh;
              padding: 0 0 16px 0;
            }
        }
        .v2-content-container.no-menu {
            margin: 0;
        }
    }
</style>
