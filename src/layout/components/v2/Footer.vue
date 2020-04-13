<template>
    <div class="c-footer">
        <div class="year">
            ©{{ $config.siteCreateTime }} - {{ $dayjs().format('YYYY') }}
        </div>
        <div class="beian">
            <a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a>
        </div>
        <div class="beian">
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702002732">{{ $config.policeBeian }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    .c-footer {
        text-align: center;
        font-size: 12px;
        width: 100%;
        height: 55px;
        line-height: 55px;
        border-top: 1px solid @border-color;
        .year {
            display: inline-block;
        }
        .beian {
            display: inline-block;
            margin: 0 0 0 10px;
            color: @font-color-footer;
            a:any-link {
                color: @font-color-footer;
            }
        }
    }
</style>