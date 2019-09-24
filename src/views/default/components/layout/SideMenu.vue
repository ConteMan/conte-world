<template>
    <el-container>
        <el-header class="header" height="60px">
            <el-row>
                <el-col :span="1" class="toggle">
                    <p>
                        <i :class="toggleIcon" v-on:click="toggle"></i>
                    </p>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="205px" class="nav-aside">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="isCollapse">
                    <router-link to="/c/yuncun">
                        <el-menu-item index="2">
                            <i class="el-icon-headset"></i>
                            <span slot="title">Yuncun</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
        <el-footer height="60px" class="footer">
            <el-row>
                <el-col :span="1">
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "SideMenu",
        data() {
            return {
                isCollapse: true,
                toggleIcon: 'el-icon-s-unfold'
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toggle() {
                this.isCollapse = !this.isCollapse
                this.toggleIcon = (this.toggleIcon == 'el-icon-s-unfold') ? 'el-icon-s-fold' : 'el-icon-s-unfold'
            }
        }
    }
</script>

<style scoped lang="stylus">
.header
    padding 0 !important

.footer
    padding 0 !important

#nav
    padding 30px
    a
        font-weight bold
        color #2c3e50
        &.router-link-exact-active
            color #42b983

.toggle
    height 60px
    vertical-align middle
    i
        font-size 32px

.nav-aside
    height calc(100vh - 120px)
    a
        text-decoration:none
    li
        text-align left

.el-menu-vertical-demo:not(.el-menu--collapse)
    width 200px
</style>