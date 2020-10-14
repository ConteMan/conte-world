<template>
  <div class="container">
    <div class="content">
      <a-row type="flex" justify="center" align="middle">
        <a-col :xs="22" :sm="22" :md="20" :lg="16" :xl="10">
          <div class="col-container">
            <div class="title">
              <span>Conte World / 泊世录</span>
            </div>
            <template v-if="!avatarBg">
              <div class="color-row bg-grey slogan">
                {{ slogan }}
              </div>
              <div class="color-row bg-light-grey nav">
                <a-space :size="20">
                  <span v-for="item in nav" :key="item.name" @click="$router.push({ path: item.router })">{{ item.name }}</span>
                </a-space>
              </div>
              <div class="color-row bg-grey social">
                <a-space :size="20">
                  <a v-for="itemSocial in socials" :href="itemSocial.url" :key="itemSocial.name">{{ itemSocial.name }}</a>
                </a-space>
              </div>
            </template>
            <div class="bg-logo">
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/layout/components/v2/Footer"

export default {
  name: "Landpage",
  components: {
    Footer,
  },
  data() {
    return {
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
        }
      ],
      socials: [
        {
          name: 'Github',
          url: 'https://github.com/ConteMan',
        },
        {
          name: 'V2EX',
          url: 'https://v2ex.com/Conte',
        },
      ],
      avatarBg: false,
    }
  },
  methods: {
    showAvatar() {
      this.avatarBg = !this.avatarBg;
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    .content {
      min-height: 100vh;
    }
  }
  .title {
    margin-top: 50px;
    height: 50px;
    font-size: 24px;
    line-height: 50px;
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
      color: white;
    }
    a:hover {
      color: #EB5757;
      border-bottom: 1px solid #EB5757;
    }
  }
  .bg-logo {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 2px;
    background-image: url('http://img.cdn.isconte.com/conteman_circle_1000x1000.png');
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -1;
  }
  .bg-logo::before {
    content: '';
    display: block;
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    opacity: 0.98;
  }
  .bg-logo {
    -webkit-animation:myRotate 30s linear infinite;
    animation:myRotate 30s linear infinite;
  }
  .avatar:hover {
    -webkit-animation:myRotate 3s linear infinite;
    animation:myRotate 3s linear infinite;
  }
  @-webkit-keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
  @keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    50%{ -webkit-transform: rotate(180deg);}
    100%{ -webkit-transform: rotate(360deg);}
  }
</style>
