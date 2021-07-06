<template>
  <div class="share-container">
    <div class="back">
      <a-icon type="left" @click="$router.push({ path: '/' + type })" />
    </div>
    <div class="content">
      <div class="fileInput">
        <button @click="() => $refs['fileInput'].click()">选择书签文件转换为 JSON 格式</button>
        <div v-if="file.name" class="file-name">{{ file.name }}</div>
        <input ref="fileInput" type="file" style="display: none" @change="fileChange" />
      </div>
      <div v-if="Object.keys(jsonData).length > 0" class="json">
        <pre class="json-pre" v-html="JSON.stringify(jsonData, null, 2)"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'Share',
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      loading: true,
      file: {},
      jsonData: {},
    };
  },
  methods: {
    ...mapMutations('app', {
      loadingAction: MT.LOADING,
    }),
    domDeal(domStr) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(domStr, "text/html");
      return doc;
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(file);
      });
    },
    async fileChange(e) {
      const current = e.target.files[0];
      this.file = current;
      const doc = await this.readFileAsync(current);
      const dealDoc = this.domDeal(doc);
      this.jsonData = this.domToJson(dealDoc.body);
    },
    // DOM 转 JSON
    domToJson(node) {
      if (!node){
        return null;
      }

      const nodeName = node.nodeName.toLowerCase();
      let current;
      if (['dl'].includes(nodeName)) {
        current = [];
      } else {
        current = {};
      }

      if (['dt'].includes(nodeName) && node.childNodes[0].nodeName.toLowerCase() === 'a') {
        const firstChildNode = node.childNodes[0];
        current.title = firstChildNode.innerHTML;
        current.url = firstChildNode.getAttribute('href');
        current.addDate = this.$dayjs.unix(firstChildNode.getAttribute('add_date')).format('YYYY-MM-DD HH:mm:ss');
        return current;
      }

      for(let i = 0; i < node.childNodes.length; i++){
        const tempNode = node.childNodes[i];
        const childNodeName = tempNode.nodeName.toLowerCase();
        if (['h1', 'h2', 'h3'].includes(childNodeName)) {
          current.name = tempNode.innerHTML;
          if (tempNode.getAttribute('add_date')) {
            current.addDate = this.$dayjs.unix(tempNode.getAttribute('add_date')).format('YYYY-MM-DD HH:mm:ss');
          }
          if (tempNode.getAttribute('last_modified')) {
            current.lastModified = this.$dayjs.unix(tempNode.getAttribute('last_modified')).format('YYYY-MM-DD HH:mm:ss');
          }
        }
        if (['dt'].includes(childNodeName)) { // 子项是 dt，父项一定是 dl
          current.push(this.domToJson(tempNode));
        }
        if (['dl'].includes(childNodeName)) {
          current.children = this.domToJson(tempNode);
        }
      }
      return current;
    }
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
