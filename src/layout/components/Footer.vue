<template>
  <div class="c-footer">
    <div class="year">
      <a :href="$config.siteUrl">{{ $config.siteName }}</a> ©{{ $config.siteCreateTime }} - {{
        $dayjs().format('YYYY')
      }}
    </div>
    <div class="beian">
      <a href="http://www.beian.miit.gov.cn/">{{ $config.beian }}</a>
    </div>
    <div class="beian">
      <a :href="'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+$config.policeBeianNum">{{
          $config.policeBeian
        }}</a>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin';

export default {
  name: 'Footer',
  mixins: [mixin],
};
</script>

<style scoped lang="less">
@import "~@/style/variables.less";

.c-footer {
  padding: 8px 16px;
  text-align: left;
  font-size: 12px;
  width: 100%;
  height: 55px;
  line-height: 1.5em;
  border-top: 1px solid @border-color;

  .year {
    color: @red-20;

    a, a:visited {
      color: @red-20;
    }
  }

  .beian {
    font-size: 10px;
    margin-right: 4px;
    display: inline-block;
    color: @font-color-footer;

    a:any-link {
      color: @font-color-footer;
    }
  }
}

.dark-theme {
  .c-footer {
    border-top-color: @dark-theme-border;
  }
}
</style>
