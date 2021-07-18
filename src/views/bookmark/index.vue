<template>
  <div class="share-container">
    <div class="back">
      <a-icon type="left" @click="$router.push({ path: '/' + type })" />
    </div>
    <div class="content">
      <div class="file-input-container">
        <button @click="() => $refs['bookmarkFileInput'].click()">选择书签文件转换为 JSON 格式</button>
        <input ref="bookmarkFileInput" type="file" style="display: none" @change="bookmarkChange" />
      </div>
      <div class="file-input-container">
        <button @click="() => $refs['opmlFileInput'].click()">选择 OPML 文件转换为 JSON 格式</button>
        <div v-if="file.name" class="file-name">{{ file.name }}</div>
        <input ref="opmlFileInput" type="file" style="display: none" @change="opmlChange" />
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
    // 书签转换按钮动作
    async bookmarkChange(e) {
      const current = e.target.files[0];
      this.file = current;
      const docStr = await this.readFileAsync(current);
      const docDom = this.domDeal(docStr);
      this.jsonData = this.bookmarkDomToJson(docDom.body);
    },
    // OPML 转换按钮动作
    async opmlChange(e) {
      const current = e.target.files[0];
      this.file = current;
      const docStr = await this.readFileAsync(current);
      const docDom = this.domDeal(docStr, 'application/xml');
      const version = docDom.querySelector('opml').getAttribute('version');
      const data = this.opmlDomToJson(docDom.querySelector('body'));
      this.jsonData = {
        version,
        data,
      };
    },
    // DOM 解析
    domDeal(domStr, type = 'text/html') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(domStr, type);
      return doc;
    },
    // 异步读取文件
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
    // 书签 DOM 转 JSON
    bookmarkDomToJson(node) {
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

      for (let i = 0; i < node.childNodes.length; i++){
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
          current.push(this.bookmarkDomToJson(tempNode));
        }
        if (['dl'].includes(childNodeName)) {
          current.children = this.bookmarkDomToJson(tempNode);
        }
      }
      return current;
    },
    // OPML 转 JSON
    opmlDomToJson(node) {
      if (!node) {
        return null
      }

      const attrs = [ 'text', 'title', 'type', 'xmlUrl', 'htmlUrl' ];
      let current = {};
      
      const currentAttrs = node.attributes;
      for (let i = 0; i < currentAttrs.length; i++) {
        const tempAttr = currentAttrs[i];
        if (attrs.includes(tempAttr.name)) {
          current[tempAttr.name] = tempAttr.value;
        }
      }

      if (node.hasChildNodes()) {
        current.children = [];
        for (let i = 0; i < node.childNodes.length; i++) {
          const tempNode = node.childNodes[i];
          if (tempNode.nodeName === 'outline') {
            current.children.push(this.opmlDomToJson(tempNode));
          }
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
