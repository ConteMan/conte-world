<template>
  <div class="page-container" :class="{ 'container': darkMode}">
    <float-actions :show-menu="false"/>
    <div class="content" :class="{ 'container': darkMode}">
      <a-row type="flex" justify="center" align="middle">
        <a-col :xs="22" :sm="22" :md="20" :lg="16" :xl="10">
          <a-spin :spinning="loading" wrapperClassName="spin-loading-container" tip="Hello, ConteMan">
            <a-icon slot="indicator" class="spin-loading" type="loading" spin />
            <div class="col-container">
              <template v-if="!loading">
                <div class="bg-logo">
                  <img alt="conteman" v-if="darkMode" src="@/assets/img/conteman_circle_deal_dark_1000x1000.png"/>
                  <img alt="conteman" v-else src="@/assets/img/conteman_circle_1000x1000.png"/>
                </div>
                <div class="title">
                  <span>{{ title }}</span>
                </div>
                <div class="color-row bg-grey slogan">
                  {{ slogan }}
                </div>
                <div class="color-row bg-light-grey nav">
                  <a-space :size="spaceSize">
                    <span v-for="item in nav.items" :key="item.id" @click="$router.push({ path: item.value })">
                      {{ item.code }}
                    </span>
                  </a-space>
                </div>
                <div class="color-row bg-grey site">
                  <a-space :size="spaceSize">
                    <span v-for="item in site.items" :key="item.id" @click="turnUrl(item.value)">
                      {{ item.code }}
                    </span>
                  </a-space>
                </div>
                <div class="color-row bg-light-grey social">
                  <a-space :size="spaceSize">
                    <a v-for="item in social.items" :key="item.id" :href="item.value">
                      {{ item.code }}
                    </a>
                  </a-space>
                </div>
                <div class="year">
                  ©{{ $config.siteCreateTime }} - {{ $dayjs().format('YYYY') }}
                </div>
              </template>
            </div>
          </a-spin>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import FloatActions from '@/layout/components/FloatActions'
import commonApi from '@/api/common'

export default {
  name: 'Landpage',
  components: {
    FloatActions,
  },
  mixins: [mixin],
  data() {
    return {
      title: '',
      slogan: '',
      nav: [],
      site: [],
      social: [],

      loading: true,
      loadingTime: 500,
      spaceSize: 20,
    }
  },
  created() {
    this.getBase()
  },
  methods: {
    turnUrl(url) {
      window.location.href = url
      return true
    },
    async getBase() {
      const start = this.$dayjs().millisecond()
      const res = await commonApi.base()
      if (res.data.code === 0) {
        const base = res.data.data
        this.title = base.title
        this.slogan = base.slogan
        this.nav = base.nav
        this.site = base.site
        this.social = base.social

        const end = this.$dayjs().millisecond()
        const time = end - start
        if (time < this.loadingTime) {
          setTimeout(() => {
            this.loading = false
          }, this.loadingTime - time)
        } else {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

@hover-color: #EB5757;
@font-color: #333333;
@font-color-white: #FFFFFF;
@bg-color-grey: #BDBDBD;
@bg-color-light-grey: #E0E0E0;

.page-container {
  .content {
    min-height: 100vh;
    display: grid;
    .col-container {
      width: 100%;
      margin-top: -70px;
      .color-row {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
      }

      .bg-grey {
        background: @bg-color-grey;
        opacity: 0.95;
      }
      .bg-light-grey {
        background: @bg-color-light-grey;
        opacity: 0.95;
      }

      .title {
        height: 50px;
        font-size: 24px;
        line-height: 50px;
        opacity: 0.99;
      }
      .slogan {
        margin-top: 20px;
        color: @font-color-white;
      }
      .nav,.site {
        span {
          cursor: pointer;
          color: @font-color;
          &:hover {
            color: @hover-color;
            border-bottom: 1px solid @hover-color;
          }
        }
      }
      .site {
        span {
          color: @font-color-white;
        }
      }
      .social {
        a {
          color: @font-color;
          &:hover {
            color: @hover-color;
            border-bottom: 1px solid @hover-color;
          }
        }
      }
      .year {
        height: 50px;
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        line-height: 50px;
        opacity: 0.5;
      }

      .bg-logo {
        position: absolute;
        width: 220px;
        top: 60px;
        right: 20px;
        -webkit-animation: myRotate 30s linear infinite;
        animation: myRotate 30s linear infinite;
        img {
          width: 100%;
        }
      }

      @-webkit-keyframes myRotate {
        0% {
          -webkit-transform: rotate(0deg);
        }
        50% {
          -webkit-transform: rotate(180deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes myRotate {
        0% {
          -webkit-transform: rotate(0deg);
        }
        50% {
          -webkit-transform: rotate(180deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
    }
  }
}

// dark mode
.dark-theme {
  .title {
    color: @font-color-grey2;
  }
  .bg-logo {
    transition: all 300ms;
  }
}
</style>
