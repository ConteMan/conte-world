<script setup lang="ts">
type ATarget = '_self' | '_blank' | '_parent' | '_top'
interface navItem {
  name: string
  link: string
  target: ATarget
}
interface socialItem {
  name: string
  link: string
  target: ATarget
  icon?: string
}
interface RecordInfo {
  num?: string
  policeText?: string
  policeNum?: string
}
interface Data {
  logo: string
  siteName: string
  userName: string
  tag: string
  slogan: string
  nav?: navItem[]
  social?: socialItem[]
  createdAt: string
  recordInfo?: RecordInfo
}

const data = reactive<Data>({
  logo: '/images/logo.gif',
  siteName: 'Conte World',
  userName: 'ConteMan',
  tag: '间歇性整理控 / 三只猫 / 喜欢晴天 / 爱吃花椒',
  slogan: 'Slow down, not so much to seize',
  createdAt: '2019',
  nav: [
    {
      name: 'Notion Site',
      link: 'https://conteworld.notion.site/',
      target: '_blank',
    },
    {
      name: 'Wiki',
      link: 'https://conteworld.notion.site/WIKI-ffed1649be6843b1b04b5467ae04eaaf',
      target: '_blank',
    },
    {
      name: 'Said',
      link: 'https://conteworld.notion.site/Said-e0cb5c4408fb4ea4941d7a954f4a7c96',
      target: '_blank',
    },
  ],
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/ConteMan',
      target: '_self',
      icon: 'mdi-github',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/RealConteMan',
      target: '_self',
      icon: 'mdi-twitter',
    },
    {
      name: 'Mail',
      link: 'mailto:real.conteman@gmail.com',
      target: '_self',
      icon: 'mdi-at',
    },
  ],
  recordInfo: {
    num: '粤ICP备 17015159 号',
    policeNum: '44030702002732',
    policeText: '粤公网安备 44030702002732 号',
  },
})

const { logo, siteName, userName, tag, slogan, nav, social, createdAt, recordInfo } = toRefs(data)

const getConfig = async () => {
  try {
    const key = import.meta.env.VITE_CONFIG_KEY
    if (key === 'miniyam') {
      data.recordInfo = {
        num: '粤ICP备 17015159 号',
        policeNum: '44030702002732',
        policeText: '粤公网安备 44030702002733 号',
      }
    }

    const workerApiUrl = import.meta.env.VITE_API ?? false
    if (workerApiUrl) {
      const res = await fetch(`${workerApiUrl}/profile?key=${key}`, {
        mode: 'cors',
        credentials: 'omit',
      }).then(response => response.json())

      if (res.data) {
        const { slogan, nav, social, createdAt, recordInfo } = res.data
        data.slogan = slogan
        data.nav = nav
        data.social = social
        data.createdAt = createdAt
        data.recordInfo = recordInfo
      }
    }

    const hasRecordSign = import.meta.env.VITE_CONFIG_HAS_RECORD_SIGN === 'true'
    if (!hasRecordSign)
      data.recordInfo = {}
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log('no data')
  }
}
getConfig()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div
    w-full
    md:max-w="full"
    lg:max-w="[800px]"
    lg:w="[800px]"
    h="screen"
    p="[2em]"
    pb="[24px]"
    flex="~ col"
    text="[14px]"
  >
    <div
      max-h="[200px]"
      min-h="[24px]"
      flex="grow-1 shrink-1"
    />
    <div
      w="[80px]"
      h="[80px]"
      flex justify-center items-center
    >
      <img :src="logo" w="[80px]" h="[80px]">
    </div>

    <div
      h="[32px]"
      mt="[24px]"
      flex="~ grow-0 shrink-0" items-center
    >
      <span>Welcome to</span>
      <span uppercase font-bold ml-1> {{ siteName }}</span>
    </div>
    <div
      h="[32px]"
      flex="~ grow-0 shrink-0" items-center
      text="[13px]"
    >
      {{ tag }}
    </div>
    <div
      h="[32px]"
      flex="~ grow-0 shrink-0 wrap" items-center
    >
      <span uppercase font-bold mr-1>{{ userName }}</span>
      <span>said</span>
      <div uppercase ml-1 mr-1 font-italic>
        "{{ slogan }}"
      </div>
    </div>

    <div
      class="nav-container"
      h="[32px]"
      mt="[16px]"
      flex="~ grow-0 shrink-0 wrap" justify-start items-center
      space="x-[16px]"
      underline decoration="2 offset-4"
    >
      <div
        uppercase
        cursor-pointer
        hover:text="red-600"
        hover:decoration="red-600"
      >
        <span @click="$router.push('article')">
          文章
        </span>
      </div>
    </div>

    <div
      v-if="nav?.length"
      class="nav-container"
      h="[32px]"
      mb="[16px]"
      flex="~ grow-0 shrink-0 wrap" justify-start items-center
      space="x-[16px]"
      underline decoration="2 offset-4"
    >
      <div
        v-for="navItem in nav" :key="navItem.name"
        uppercase
        hover:text="red-600"
        hover:decoration="red-600"
      >
        <a :href="navItem.link" :target="navItem.target">
          {{ navItem.name }}
        </a>
      </div>
    </div>

    <div
      v-if="social?.length"
      class="social-container"
      h="[32px]"
      flex="~ grow-0 shrink-0 wrap" justify-start items-center
      space="x-[16px]"
    >
      <div
        v-for="socialItem in social" :key="socialItem.name"
        flex items-center
        hover:text="red-600"
        text="[18px]"
      >
        <a :href="socialItem.link" :target="socialItem.target">
          <mdi-github v-if="socialItem.icon === 'mdi-github'" />
          <mdi-twitter v-else-if="socialItem.icon === 'mdi-twitter'" />
          <bxl-telegram v-else-if="socialItem.icon === 'bxl-telegram'" />
          <mdi-at v-else-if="socialItem.icon === 'mdi-at'" />
          <mdi-rss v-else-if="socialItem.icon === 'mdi-rss'" />
        </a>
      </div>
      <div />
      <button
        text="[18px] gray-400" dark:text=" gray-500" hover:text="red-600"
        @click="toggleDark()"
      >
        <div i-mdi-theme-light-dark />
      </button>
    </div>
    <div mt="[24px]" pb="[24px]">
      <div
        class="copyright"
        leading="[12px]"
      >
        <svg width="300" height="12">
          <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
            CODE && DESIGN BY {{ userName.toUpperCase() }} © {{ createdAt }} - 2022
          </text>
        </svg>
      </div>

      <div
        v-if="recordInfo?.num || recordInfo?.policeNum"
        class="record"
        mt="[4px]"
      >
        <div leading-0>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            inline-block
          >
            <svg width="140" height="12">
              <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                {{ recordInfo?.num }}
              </text>
            </svg>
          </a>
        </div>
        <div
          leading-0
          mt="[2px]"
        >
          <a
            :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${recordInfo?.policeNum}`"
            target="_blank"
            inline-block
          >
            <svg
              width="200"
              height="12"
            >
              <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                {{ recordInfo?.policeText }}
              </text>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.copyright svg,.record svg {
  fill: #8c8c8c;
}
</style>
