<template>
  <div>
    <div class="list-header">
      {{ $config.oneTitle }}
    </div>
    <card class="fixed-header-container card" />
  </div>
</template>

<script>
import Card from '@/components/one/Card';

export default {
  name: 'Index',
  components: {
    Card
  },
  mounted() {
  }
};
</script>
