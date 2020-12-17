<template>
  <div class="header">
    <div class="trigger">
      <a-icon type="menu" class="menu"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  border-bottom: 1px solid @border-color;

  .trigger {
    display: inline-block;
    width: 80px;
    text-align: center;
    margin-left: -10px;

    .menu {
      font-size: 20px;
      line-height: 45px;
    }
  }
}
</style>
