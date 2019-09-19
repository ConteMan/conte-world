<template>
  <div class="main">
    <YuncunCard></YuncunCard>
  </div>
</template>

<script>
import YuncunCard from "../components/YuncunCard";

export default {
  name: 'home',
  components: {
    YuncunCard
  },
  beforeCreate() {
    document.title = this.$route.meta.title || "title is missing"
  }
}
</script>

<style scoped lang="stylus">
  .main
    height 100%
    width 100%
    padding-top calc(40vh - 200px)
</style>
