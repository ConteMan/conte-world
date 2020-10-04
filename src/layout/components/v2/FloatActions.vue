<template>
    <div class="container">
        <div class="item">
          <a-button @click="menuAction">
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
            }
            .ant-btn {
              padding: 0 10px;
            }
            --antd-wave-shadow-color: none;
        }
    }
</style>
