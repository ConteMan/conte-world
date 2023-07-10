<script setup lang="ts">
const screenStore = useScreenStore()
const screenSizeClass = computed(() => {
  return [screenStore.screenSize]
})

const loading = ref(true)
onMounted(() => {
  document.querySelector('.custom-container')?.classList.add(`${screenStore.screenSize}`)
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
        <NuxtLink to="/" class="nav-link">
          <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
        </NuxtLink>
      </div>
      <div class="nav">
        <div class="nav-item" :class="{ active: $route.path.match('article') }">
          <NuxtLink to="/article" class="nav-link">
            <!-- <Icon name="bx:note" size="24" /> -->
            <span>文章</span>
          </NuxtLink>
        </div>
        <div class="nav-item" :class="{ active: $route.path.match('memo') }">
          <NuxtLink to="/memo" class="nav-link">
            <!-- <Icon name="bx:box" size="24" /> -->
            <span>说说</span>
          </NuxtLink>
        </div>
        <div class="nav-item" :class="{ active: $route.path.match('subject') }">
          <NuxtLink to="/subject" class="nav-link">
            <!-- <Icon name="bx:movie" size="24" /> -->
            <span>影音</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="head-mobile-container">
      <div class="grow-0 flex-shrink-0">
        <NuxtLink to="/" class="nav-link">
          <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
        </NuxtLink>
      </div>
      <div class="grow-1 flex justify-end gap-2">
        <Icon name="bx:category" size="24" @click="systemStore.toggleNavDrawer()" />
      </div>
    </div>

    <div class="drawer fixed z-[999]">
      <input id="my-drawer" v-model="systemStore.showNavDrawer" type="checkbox" class="drawer-toggle">
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay" />

        <div class="head-side-drawer">
          <div class="logo py-[24px] pl-[36px]">
            <img src="/public/images/logo.gif" alt="logo" class="w-[32px] h-[32px]">
          </div>
          <div class="nav">
            <div class="nav-item" :class="{ active: $route.path.match('article') }">
              <div class="nav-link" @click="useDrawerNav('/article')">
                <!-- <Icon name="bx:note" size="24" /> -->
                <span>文章</span>
              </div>
            </div>
            <div class="nav-item" :class="{ active: $route.path.match('memo') }">
              <div class="nav-link" @click="useDrawerNav('/memo')">
                <!-- <Icon name="bx:box" size="24" /> -->
                <span>说说</span>
              </div>
            </div>
            <div class="nav-item" :class="{ active: $route.path.match('subject') }">
              <div class="nav-link" @click="useDrawerNav('/subject')">
                <!-- <Icon name="bx:movie" size="24" /> -->
                <span>影音</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container grow-1 h-full overflow-x-hidden overflow-y-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.head-side-container,
.head-side-drawer {
  @apply w-[180px] flex-shrink-0 flex flex-col h-full bg-white overflow-x-hidden overflow-y-auto;
}
.head-side-drawer {
  @apply max-w-[100%] w-[280px];
}

.small,
.medium {
  @apply flex-col items-start;
}
.small .head-side-container,
.medium .head-side-container {
  @apply !hidden;
}
.head-mobile-container {
  @apply hidden;
}
.small .head-mobile-container,
.medium .head-mobile-container {
  @apply w-[60%] fixed bottom-[10px] left-[20%] z-[1] flex justify-start items-center px-[36px] py-[8px] box-border bg-white rounded-lg shadow-md;
}
.small .head-mobile-container {
  @apply w-[90%] left-[5%];
}
.small .content-container,
.medium .content-container {
  @apply w-full;
}
.nav {
  @apply flex flex-col gap-[12px] px-[20px];
}
.nav-item {
  @apply relative flex justify-start items-center pl-[16px] py-[4px] no-underline;
}
.nav-link {
  @apply box-border w-full py-2 flex gap-[12px] justify-start items-center text-black visited:text-black no-underline;
}
.nav-link:hover {
  @apply text-gray-600;
}
.active::before {
  @apply absolute -left-2 inline-block w-[2px] h-4 rounded-sm bg-black;
  content: '';
}
.active .nav-link {
  @apply text-black;
}
</style>
