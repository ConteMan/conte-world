<script setup lang="ts">
</script>

<template>
  <div
    min-h="screen"
    w-full max-w="[800px]"
    flex="~ col" justify-center
  >
    <div
      class="content"
      h="[540px]" h-full
      w="[800px]" w-full
      flex="~ col"
      py="[40px]" px="[24px]"
    >
      <div
        w="[80px]"
        h="[80px]"
        bg="gray-300"
        flex justify-center items-center
        rounded="[50%]"
      >
        <img src="/images/logo.gif" w="[80px]" h="[80px]">
      </div>

      <div
        h="[32px]"
        mt="[24px]"
        flex items-center
      >
        Hey, I'm ConteMan.
      </div>
      <div
        h="[32px]"
        flex items-center
      >
        间歇性整理控 / 三只猫 / 喜欢晴天 / 爱吃花椒
      </div>
      <div
        h="[32px]"
        flex items-center
      >
        Slow down, not so much to seize.
      </div>

      <div
        class="nav-container"
        mt="[16px]"
        flex justify-start items-center
        space="x-[16px]"
        underline decoration="2 offset-2"
      >
        <div>BLOG</div>
        <div>PROJECT</div>
        <div>MOVIE & BOOK</div>
        <div>SAID</div>
      </div>

      <div
        class="social-container"
        mt="[16px]"
        flex justify-start items-center
        space="x-[16px]"
      >
        <div flex items-center>
          <mdi-github />
        </div>
        <div flex items-center>
          <mdi-twitter />
        </div>
        <div flex items-center>
          <bxl-telegram />
        </div>
        <div flex items-center>
          <mdi-at />
        </div>
        <div flex items-center>
          <mdi-rss />
        </div>
      </div>

      <div
        class="copyright"
        mt="[48px]"
        leading="[12px]"
      >
        <svg width="300" height="12">
          <text dominant-baseline="baseline" font-size="10" y="10" x="0" text-anchor="start">
            DESIGN && CODE BY CONTEMAN ©2019-2022
          </text>
        </svg>
      </div>

      <div
        class="record"
        mt="[8px]"
      >
        <div
          leading-0
        >
          <svg width="200" height="12">
            <text dominant-baseline="baseline" font-size="8" y="10" x="0" text-anchor="start">
              粤ICP备17015159号
            </text>
          </svg>
        </div>
        <div
          leading-0
          mt="[2px]"
        >
          <svg
            width="200"
            height="12"
          >
            <text dominant-baseline="baseline" font-size="8" y="10" x="0" text-anchor="start">
              粤公网安备44030702002732号
            </text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.record svg {
  fill: #8c8c8c;
}
</style>
