<template>
  <transition name="page-toggle">
      <router-view />
  </transition>
</template>

<script>
export default {
  name: 'RouteView',
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    }
  },
  updated() {
    console.log('routeView------'+document.documentElement.scrollTop)
  },
  activated(){
    console.log('routeViewactivated------'+document.documentElement.scrollTop)
  }
}
</script>

<style scoped>

</style>
