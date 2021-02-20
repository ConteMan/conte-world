<template>
  <div class="page-container" :class="{ 'container': darkMode}">
    <float-actions :show-menu="false"/>
    <div class="content" :class="{ 'container': darkMode}">
      <a-row type="flex" justify="center" align="middle">
        <a-col :xs="22" :sm="22" :md="20" :lg="16" :xl="10">
          <div class="col-container">
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
              <a-space :size="20">
                <span v-for="item in nav" :key="item.name" @click="$router.push({ path: item.router })">
                  {{ item.name }}
                </span>
              </a-space>
            </div>
            <div class="color-row bg-grey project">
              <span @click="turnUrl('https://wiki.isconte.com')">WIKI</span>
            </div>
            <div class="color-row bg-light-grey social">
              <a-space :size="20">
                <a v-for="item in socials" :key="item.id" :href="item.value">
                  {{ item.code }}</a>
              </a-space>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import Footer from '@/layout/components/Footer'
import FloatActions from '@/layout/components/FloatActions'
import commonApi from '@/api/common'

export default {
  name: 'Landpage',
  components: {
    Footer,
    FloatActions,
  },
  mixins: [mixin],
  data() {
    return {
      title: 'ConteWorld / 泊世录',
      slogan: 'Slow down, not so much to seize.',
      nav: [
        {
          name: '一个',
          router: '/one',
        },
        {
          name: '文章',
          router: '/article',
        },
        {
          name: '电影',
          router: '/film',
        },
        {
          name: '世界线',
          router: '/worldline',
        }
      ],
      socials: [],
    }
  },
  created() {
    this.getSocails()
  },
  methods: {
    turnUrl(url) {
      window.location.href = url
      return true
    },
    // 社交信息
    async getSocails() {
      const res = await commonApi.socials()
      if (res.data.code === 0) {
        this.socials = res.data.data.items
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables"; //变量

.page-container {
  .content {
    min-height: 100vh;
    display: grid;
  }
}

.title {
  height: 50px;
  font-size: 24px;
  line-height: 50px;
  opacity: 0.99;

  .avatar {
    margin-left: 20px;
    height: 50px;
    width: 50px;
    line-height: 50px;
    margin-top: -7px;
  }
}

.col-container {
  width: 100%;
  margin-top: -70px;
}

.color-row {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}

.bg-grey {
  background: #BDBDBD;
  opacity: 0.95;
}

.bg-light-grey {
  background: #E0E0E0;
  opacity: 0.95;
}

.slogan {
  margin-top: 20px;
  color: white;
}

.nav {
  span {
    cursor: pointer;
    color: #333333;
  }

  span:hover {
    color: #EB5757;
    border-bottom: 1px solid #EB5757;
  }
}

.social {
  a {
    color: #333333;
  }

  a:hover {
    color: #EB5757;
    border-bottom: 1px solid #EB5757;
  }
}

.project {
  span {
    cursor: pointer;
    color: white;
  }

  span:hover {
    color: #EB5757;
    border-bottom: 1px solid #EB5757;
  }
}

.bg-logo {
  position: absolute;
  width: 180px;
  top: -120px;
  right: 2px;
  opacity: 0.3;

  img {
    width: 100%;
  }
}

.bg-logo {
  -webkit-animation: myRotate 30s linear infinite;
  animation: myRotate 30s linear infinite;
}

.avatar:hover {
  -webkit-animation: myRotate 3s linear infinite;
  animation: myRotate 3s linear infinite;
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

.dark-theme {
  .title {
    color: @font-color-grey2;
  }

  .bg-logo {
    transition: all 300ms;
  }
}
</style>
