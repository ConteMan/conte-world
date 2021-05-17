<template>
  <div v-if="ready" class="page-container">
    <div class="content-container">
      <div class="title logo">
        <span>{{ info.title }}</span>
      </div>

      <div class="color-row slogan">
        {{ info.slogan }}
      </div>

      <div class="color-row nav">
        <span v-for="item in info.nav.items" :key="item.id" @click="$router.push({ path: item.value })">
          {{ item.extend ? item.extend.name : item.code }}
        </span>
      </div>

      <div class="color-row site">
        <span v-for="item in info.site.items" :key="item.id" @click="turnTo(item)">
          {{ item.extend ? item.extend.name : item.code }}
        </span>
      </div>

      <div class="color-row social">
        <span v-for="item in info.social.items" :key="item.id" :title="item.code" @click="turnTo(item)">
          <c-icon :type="'icon-' + item.extend.icon" />
        </span>
        <span title="Dark Mode" @click="darkAction">
          <c-icon type="icon-dark" />
        </span>
      </div>

      <div class="info">
        <div class="beian pointer">
          <svg width="200" height="11.52" @click="turnTo({ extend: {}, value: 'https://beian.miit.gov.cn/' })">
            <text dominant-baseline="baseline" font-size="10" y="9.52" x="200" text-anchor="end">
              {{ $config.beian }}
            </text>
          </svg>
        </div>
        <div class="beian pointer">
          <svg
            width="200"
            height="11.52"
            @click="
              turnTo({
                extend: {},
                value: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + $config.policeBeianNum,
              })
            "
          >
            <text dominant-baseline="baseline" font-size="10" y="9.52" x="200" text-anchor="end">
              {{ $config.policeBeian }}
            </text>
          </svg>
        </div>
        <div class="run-time">
          <svg width="300" height="11.52">
            <text dominant-baseline="baseline" font-size="10" y="9.52" x="300" text-anchor="end">
              CODE && DESIGN BY CONTEMAN ©{{ $config.siteCreateTime }}-{{ $dayjs().format('YYYY') }}
            </text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'Landpage',
  mixins: [mixin],
  beforeRouteEnter(to, from, next) {
    document.querySelector('body').classList.add('overflow-y-hidden');
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector('body').classList.remove('overflow-y-hidden');
    next();
  },
  computed: {
    ready() {
      return Object.keys(this.info).length > 0;
    },
  },
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
    }),
    turnTo(item) {
      const extend = item.extend;
      if (extend.type && extend.type === 'route') {
        this.$router.push({ path: item.value });
      } else {
        window.location.href = item.value;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
