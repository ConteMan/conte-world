<template>
  <div class="footer">
    <div class="year">
      ©{{ $config.siteCreateTime }} - {{ $dayjs().format('YYYY') }}
    </div>
    <div class="beian">
      <a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a>
    </div>
    <div class="beian">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702002732">{{
          $config.policeBeian
        }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footbar'
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.footer {
  position: relative;
  text-align: center;
  line-height: 55px;
  height: 55px;
  color: @font-color-footer;
  font-size: 12px;
  bottom: 0;
  width: 100%;

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
