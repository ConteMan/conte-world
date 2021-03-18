<template>
  <div v-if="ready" class="page-container">
    <div class="content">
      <a-row type="flex" justify="center" align="middle">
        <a-col :xs="22" :sm="22" :md="20" :lg="18" :xl="16" :xxl="14">
          <div class="col-container">
            <div class="title logo">
              <span>{{ info.title }}</span>
              <span class="dark" @click="darkAction()">
                <c-icon type="icon-dark"/>
              </span>
            </div>
            <div class="color-row bg-grey slogan">
              {{ info.slogan }}
            </div>
            <div class="color-row bg-light-grey nav">
              <span v-for="item in info.nav.items" :key="item.id" @click="$router.push({ path: item.value })">
                {{ item.extend ? item.extend.name : item.code }}
              </span>
            </div>
            <div class="color-row bg-grey site">
              <span v-for="item in info.site.items" :key="item.id" @click="turnUrl(item.value)">
                {{ item.extend ? item.extend.name : item.code }}
              </span>
            </div>
            <div class="color-row bg-light-grey social">
              <span v-for="item in info.social.items" :key="item.id" title="item.code" @click="turnUrl(item.value)">
                <c-icon :type="'icon-' + item.extend.icon"/>
              </span>
            </div>
            <div class="info">
              <div class="beian">
                <svg width="200" height="11.52" @click="turnUrl('https://beian.miit.gov.cn/')">
                  <text
                    dominant-baseline="baseline"
                    font-size="10"
                    y="9.52"
                    x="200"
                    text-anchor="end"
                  >
                    {{ $config.beian}}
                  </text>
                </svg>
              </div>
              <div class="beian">
                <svg width="200" height="11.52" @click="turnUrl('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + $config.policeBeianNum)">
                  <text
                    dominant-baseline="baseline"
                    font-size="10"
                    y="9.52"
                    x="200"
                    text-anchor="end"
                  >
                    {{ $config.policeBeian}}
                  </text>
                </svg>
              </div>
              <div class="run-time">
                <svg width="300" height="11.52">
                  <text
                    dominant-baseline="baseline"
                    font-size="10"
                    y="9.52"
                    x="300"
                    text-anchor="end"
                  >
                    CODE && DESIGN BY CONTEMAN ©{{ $config.siteCreateTime }}-{{ $dayjs().format('YYYY') }}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'

export default {
  name: 'Landpage',
  mixins: [mixin],
  data() {
    return {
      spaceSize: 20,
    }
  },
  computed: {
    ready() {
      return Object.keys(this.info).length > 0
    },
  },
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
    }),
    turnUrl(url) {
      window.location.href = url
      return true
    },
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
    padding: 100px 0 0 0;
    .col-container {
      width: 100%;
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        height: 200px;
        width: 200px;
        background: center / contain no-repeat url("~@/assets/img/conteman_circle_1000x1000.png");
        opacity: 0.5;
        -webkit-animation: myRotate 30s linear infinite;
        animation: myRotate 30s linear infinite;
      }
      .color-row {
        width: 100%;
        min-height: 50px;
        padding: 16px 20px;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: space-between;
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
      .dark {
        margin-left: 40px;
        opacity: 0.2;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
      .slogan {
        margin-top: 20px;
        color: @font-color-white;
      }
      .nav,.site,.social {
        padding: 12px 20px;
        position: relative;
        span {
          cursor: pointer;
          color: @font-color;
          margin: 4px 12px 4px 0;
          &:hover {
            font-weight: 800;
            color: @hover-color;
            box-shadow: 0 -1px 0 0 @hover-color inset;
          }
        }
      }
      .site {
        span {
          color: @font-color-white;
        }
      }
      .social {
        font-size: 16px;
        span {
          margin: 4px 16px 4px 0;
          &:hover {
            box-shadow: none;
          }
        }
      }
      .info {
        height: 50px;
        margin-top: 30px;
        text-align: right;
        font-size: 12px;
        .beian,.run-time {
          cursor: pointer;
          svg {
            fill: @bg-color-grey;
            text {
              line-height: 1;
              vertical-align: middle;
            }
          }
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
  .bg-logo {
    transition: all 300ms;
  }
  .col-container {
    &::before {
      background: center / contain no-repeat url("~@/assets/img/conteman_circle_deal_dark_1000x1000.png") !important;
      opacity: 0.1 !important;
    }
    .bg-grey {
      background: @dark-theme-border !important;
      color: @grey !important;
    }
    .bg-light-grey {
      background: @dark-theme-bg !important;
      color: @border-color !important;
    }
    .nav,.site,.social {
      span {
        color: @border-color !important;
      }
    }
  }
}
</style>
