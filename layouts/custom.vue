<script setup lang="ts">
const route = useRoute()

const loading = ref(true)

const screenStore = useScreenStore()
const screenSize = computed(() => {
  return screenStore.screenSize
})
const screenSizeClass = computed(() => [screenStore.screenSize])
onMounted(() => {
  document.querySelector('.custom-container')?.classList.add(screenSize.value)
  loading.value = false
})

const systemStore = useSystemStore()
</script>

<template>
  <div
    v-show="!loading"
    class="custom-container w-screen h-screen overflow-hidden flex flex-row justify-center items-center"
    :class="screenSizeClass"
  >
    <div class="head-side-container">
      <div class="logo py-[24px] pl-[36px]">
        <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
      </div>
      <div class="nav">
        <div class="nav-item">
          <NuxtLink to="/" class="nav-link">
            <Icon name="bx:home-alt-2" size="24" />
            <span>主页</span>
          </NuxtLink>
        </div>
        <div class="nav-item" :class="{ active: route.path.match('article') }">
          <NuxtLink to="/article" class="nav-link">
            <Icon name="bx:note" size="24" />
            <span>文章</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="head-top-container">
      <div class="grow-0 flex-shrink-0">
        <NuxtLink to="/" class="nav-link">
          <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
        </NuxtLink>
      </div>
      <div class="grow-1 flex justify-end gap-2">
        <Icon name="bx:category" size="24" @click="systemStore.toggleNavDrawer()" />
      </div>
    </div>

    <div class="drawer fixed">
      <input id="my-drawer" v-model="systemStore.showNavDrawer" type="checkbox" class="drawer-toggle">
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay" />

        <div class="head-side-drawer">
          <div class="logo py-[24px] pl-[36px]">
            <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
          </div>
          <div class="nav">
            <div class="nav-item">
              <div class="nav-link" @click="useDrawerNav('/')">
                <Icon name="bx:home-alt-2" size="24" />
                <span>主页</span>
              </div>
            </div>
            <div class="nav-item" :class="{ active: route.path.match('article') }">
              <div class="nav-link" @click="useDrawerNav('/article')">
                <Icon name="bx:note" size="24" />
                <span>文章</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container h-full grow-1">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.head-side-container,
.head-side-drawer {
  @apply w-[180px] flex-shrink-0 flex flex-col h-full bg-[#F5F5F5] border-r-[#F5F5F5];
}
.small,
.medium {
  @apply flex-col items-start;
}
.small .head-side-container,
.medium .head-side-container {
  @apply !hidden;
}
.head-top-container {
  @apply hidden;
}
.small .head-top-container,
.medium .head-top-container {
  @apply w-full flex justify-start items-center px-[36px] py-[24px] box-border bg-[#F5F5F5];
}
.small .content-container,
.medium .content-container {
  @apply w-full;
  height: calc(100% - 80px);
}
.nav {
  @apply flex flex-col gap-[8px] px-[20px];
}
.nav-item {
  @apply flex justify-start items-center pl-[16px] py-[4px] no-underline rounded-md;
}
.nav-link {
  @apply flex gap-[12px] justify-start items-center text-black visited:text-black no-underline;
}
.active {
  @apply border border-solid border-black shadow-md;
}
</style>
