<script setup lang="ts">
import { Navigations } from '~/constants'
import { Profile } from '~/apis/index'

definePageMeta({
  layout: 'default',
})
const profile = await Profile.index()
</script>

<template>
  <div class="w-[1280px] lg:h-[416px] lt-lg:w-full m-4 lt-lg:m-6 flex lg:flex-row flex-col gap-4 lt-lg:gap-4 justify-center items-center text-black">
    <div class="max-w-[500px] lt-lg:w-full lt-lg:max-w-full h-full lt-lg:h-[240px] flex-grow-2 flex flex-col">
      <div class="cw-card w-full flex-grow flex">
        <div class="w-[16px] h-full bg-black" />
        <div class="flex-grow p-(l-[48px] t-[48px])">
          <img :src="profile.logo" alt="logo" class="h-24 lt-lg:h-18" data-not-lazy>
          <div class="mt-[40px]">
            "{{ profile.slogan }}"
          </div>
          <div class="mt-[8px]">
            via. <span class="italic">{{ profile.userName }}</span>
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
              Project ...
            </div>
          </div>
          <div class="cw-card w-full h-[50%] flex justify-center items-center">
            <div class="font-bold text-[48px]">
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
            <a class="text-black visited:text-black" :href="item.link" :target="item.target">
              <Icon :name="item.icon" />
            </a>
          </template>
        </div>
      </div>
      <div class="flex-grow flex flex-row gap-3">
        <div class="cw-card w-[50%]">
          <div class="h-full px-4 flex flex-col justify-center">
            <template v-for="item in (profile.tag).split('/')" :key="item">
              <div class="text-right">
                {{ item }}
              </div>
            </template>
          </div>
        </div>
        <div class="cw-card w-[50%]">
          <div class="cw-card-content">
            Lab ...
          </div>
        </div>
      </div>
      <div class="h-[80px] flex gap-3">
        <div class="copyright cw-card pl-4 flex-grow flex flex-col justify-center">
          <div class="h-[14px]">
            <svg width="240" height="12">
              <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
                {{ profile.userName.toUpperCase() }} © {{ profile.createdAt }} - {{ new Date().getFullYear() }}
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
        <div class="cw-card w-[80px] flex justify-center items-center">
          <Icon name="mdi:information-outline" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cw-card {
  @apply rounded-md border-2 border-solid border-black;
}
.cw-card-content {
  @apply p-4 h-full box-border text-[18px];
  --at-apply: lt-lg:text-[16px];
}
.link-title {
  @apply text-[20px];
  --at-apply: lt-lg:text-[16px];
}
.copyright svg {
  fill: #000000;
}
</style>
