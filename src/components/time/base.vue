<template>
  <div class="timer">
    {{ timeStr }}
  </div>
</template>

<script>
export default {
  name: 'BaseTimer',
  data() {
    return {
      timeStr: '...'
    };
  },
  methods: {
    getTimeStr() {
      const d = new Date();
      this.timeStr = d.getFullYear() +
        '-' + (d.getMonth() + 1) +
        '-' + this.format(d.getDate()) +
        ' ' + this.format(d.getHours()) +
        ':' + this.format(d.getMinutes()) +
        ':' + this.format(d.getSeconds());
    },
    format(time) {
      return time < 10 ? '0' + time : time;
    }
  },
  mounted() {
    setInterval(this.getTimeStr, 1000);
  }
};
</script>

<style scoped>

</style>
