<template>
    <div class="container">
        <div class="item">
          <a-button @click="menuAction" title="打开菜单">
            <a-icon type="appstore" :theme="menuIconTheme"/>
          </a-button>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { mixin } from '@/utils/mixin'

    export default {
        name: "FloatActions",
        computed: {
            menuIconTheme: function() {
                return this.menuStatus ? 'filled' : 'outlined';
            }
        },
        mixins: [ mixin ],
        methods: {
            ...mapMutations({
                menuAction: 'MENU_ACTION',
            }),
        }
    }
</script>

<style scoped lang="less">
@import "~@/style/variables";
    .container {
        position: fixed;
        bottom: 64px;
        right: 16px;
        height: max-content;
        z-index: 9999;
        .item {
            margin: 10px 0 0 0;
            .ant-btn:hover, .ant-btn:focus {
              color: unset;
              border-color: #d9d9d9;
              box-shadow: none;
              animation: jelly 0.5s;
            }
            .ant-btn {
              padding: 0 10px;
              border: 1px solid @border-color;
              border-radius: 1px;
            }
            --antd-wave-shadow-color: none;
            @keyframes jelly {
              0%,
              100% {
                transform: scale(1, 1);
              }
              25% {
                transform: scale(0.9, 1.1);
              }
              50% {
                transform: scale(1.1, 0.9);
              }
              75% {
                transform: scale(0.95, 1.05);
              }
            }
        }
    }
</style>
