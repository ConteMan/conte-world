<script setup lang="ts">
import { Navigations, packageJson } from '~/constants'
import { Profile } from '~/apis/index'

definePageMeta({
  layout: 'default',
})
const profile = await Profile.index()
</script>

<template>
  <div class="w-[1280px] h-[416px] lt-lg:h-auto lt-lg:w-full m-4 lt-lg:m-6 flex flex-row lt-lg:flex-col gap-4 lt-lg:gap-4 justify-center items-center text-black">
    <div class="max-w-[500px] lt-lg:w-full lt-lg:max-w-full h-full lt-lg:h-[280px] flex-grow-2 flex flex-col">
      <div class="profile-card cw-card w-full flex-grow flex">
        <div class="w-[16px] h-full bg-black" />
        <div class="flex-grow p-(l-[48px] t-[48px])">
          <img :src="profile.logo" alt="logo" class="h-24 lt-lg:h-18" data-not-lazy>
          <div class="mt-[40px] text-[16px]">
            "{{ profile.slogan }}"
          </div>
          <div class="mt-[8px]">
            via. <span class="italic text-[18px]">{{ profile.userName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[272px] lt-lg:w-full h-full lt-lg:h-[400px] flex flex-col gap-4 lt-lg:gap-4">
      <div class="cw-card w-full h-[160px]">
        <div class="cw-card-content flex flex-col justify-between">
          <NuxtLink to="/article" class="flex gap-1 justify-start items-center no-underline text-black">
            <span class="link-title">{{ Navigations.ARTICLE }}</span>
            <Icon name="bx:link-external" size="18" />
          </NuxtLink>

          <NuxtLink to="/memo" class="flex gap-1 justify-end items-center no-underline text-black">
            <span class="link-title">{{ Navigations.MEMO }}</span>
            <Icon name="bx:link-external" size="18" />
          </NuxtLink>
        </div>
      </div>
      <div class="flex-grow flex gap-3">
        <div class="cw-card w-[60%]">
          <div class="cw-card-content h-full">
            <NuxtLink to="/subject" class="flex gap-1 justify-start items-center no-underline text-black">
              <span class="link-title">{{ Navigations.SUBJECT }}</span>
              <Icon name="bx:link-external" size="18" />
            </NuxtLink>
          </div>
        </div>
        <div class="flex-grow flex flex-col gap-4 lt-lg:gap-4">
          <div class="cw-card w-full h-[50%]">
            <div class="cw-card-content">
              .
            </div>
          </div>
          <div class="cw-card word-bo w-full h-[50%] flex justify-center items-center">
            <div class="font-bold text-[48px] absolute z-1">
              泊
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[300px] lt-lg:w-full h-full lt-lg:h-[420px] flex-grow-1 flex flex-col gap-3">
      <div class="cw-card h-[80px] flex justify-center items-center">
        <div class="flex flex-wrap justify-center gap-2">
          <template v-for="item in profile.social" :key="item.link">
            <a class="text-black visited:text-black hover:(text-red)" :href="item.link" :target="item.target">
              <Icon :name="item.icon" />
            </a>
          </template>
        </div>
      </div>
      <div class="flex-grow flex flex-row gap-3">
        <div class="cw-card w-[50%]">
          <div class="h-full px-4 flex flex-col justify-center gap-1">
            <template v-for="item in (profile.tag).split('/')" :key="item">
              <div class="text-right">
                {{ item }}
              </div>
            </template>
          </div>
        </div>
        <div class="cw-card w-[50%]">
          <div class="cw-card-content">
            .
            <!-- <NuxtLink to="/leetcode" class="flex gap-1 justify-start items-center no-underline text-black">
              <span class="link-title">{{ Navigations.LEETCODE }}</span>
              <Icon name="bx:link-external" size="18" />
            </NuxtLink>
            <NuxtLink to="/wiki" class="flex gap-1 justify-start items-center no-underline text-black">
              <span class="link-title">{{ Navigations.WIKI }}</span>
              <Icon name="bx:link-external" size="18" />
            </NuxtLink> -->
          </div>
        </div>
      </div>
      <div class="h-[80px] flex gap-3">
        <div class="copyright cw-card pl-4 flex-grow flex flex-col justify-center">
          <div class="h-[14px]">
            <svg width="240" height="12">
              <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                {{ profile.userName.toUpperCase() }} © {{ profile.createdAt }} - {{ new Date().getFullYear() }} / v{{ packageJson.version }}
              </text>
            </svg>
          </div>
          <div class="h-[12px]">
            <a href="https://beian.miit.gov.cn/" target="_blank">
              <svg width="140" height="12">
                <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                  {{ profile.recordInfo?.num }}
                </text>
              </svg>
            </a>
          </div>
          <div class="h-[12px]">
            <a
              :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${profile.recordInfo?.policeNum}`"
              target="_blank"
            >
              <svg width="200" height="12">
                <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                  {{ profile.recordInfo?.policeText }}
                </text>
              </svg>
            </a>
          </div>
        </div>
        <div class="cw-card w-[80px]">
          <div class="cw-card-content">
            .
          </div>
          <!-- <Icon name="mdi:information-outline" size="24" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cw-card {
  @apply rounded-md border-2 border-solid border-black;
}
.cw-card:hover {
  box-shadow: -1px 3px 0px 1px rgba(0, 0, 0);
}
.cw-card-content {
  @apply p-4 h-full box-border text-[18px];
  --at-apply: lt-lg:text-[16px];
}
.link-title {
  --at-apply:  hover:(text-red underline underline-offset-6 decoration-2) lt-lg:text-[16px];
}
.copyright svg {
  fill: #000000;
}
.copyright a {
  @apply no-underline;
}

.profile-card {
  opacity: 0;
  animation: slideRight 1s ease forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.word-bo {
  border: none;
  border-radius: 4px;
  position: relative;
  background: repeating-conic-gradient(from var(--a), #000 0%, #fff 5%, transparent 5%, transparent 40%, #000 50%);
  animation: degAnime 4s linear infinite;
}
.word-bo:before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: repeating-conic-gradient(from var(--a), #000 0%, #fff 5%, transparent 5%, transparent 40%, #000 50%);
  animation: degAnime 4s linear infinite;
  animation-delay: -1s;
}
.word-bo::after {
  position: absolute;
  content: '';
  inset: 2px;
  border-radius: 4px;
  background: white;
}
.word-bo:hover {
  box-shadow: none;
}
@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes degAnime {
  0% {
    --a: 0deg;
  }
  100% {
    --a: 360deg;
  }
}
</style>
