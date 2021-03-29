<template>
  <div>
    <div class="list-header">
      {{ $config.changelogTitle }}
    </div>
    <iframe
class="iframe"
:srcdoc="data"
style="width: 100%;height: calc(100vh - 4px); border: none;"
frameborder="0"
            scrolling="auto"></iframe>
  </div>
</template>

<script>
import systemApi from '@/api/system';

export default {
  name: 'Index',
  data() {
    return {
      data: ''
    };
  },
  created() {
    this.detail();
  },
  methods: {
    detail() {
      systemApi.changelog().then(
        response => {
          this.data = response.data.data.body_html;
        }
      );
    },
  }
};
</script>

<style scoped lang="less">
.iframe {
  margin: 4px 10px;
}
</style>
