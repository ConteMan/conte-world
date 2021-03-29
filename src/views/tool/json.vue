<template>
  <div>
    <tab-header v-bind="{active: active}"/>
    <div ref="jsoneditor" id="jsoneditor">

    </div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor/dist/jsoneditor.min';
import 'jsoneditor/dist/jsoneditor.min.css';
import TabHeader from '@/views/tool/components/TabHeader';

const modes = [
  'tree',
  'view',
  'form',
  'code',
  'text',
];

export default {
  name: 'VJsoneditor',
  components: {
    TabHeader,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      jsoneditor: null,
      active: this.$route.name
    };
  },
  watch: {
    value(value) {
      this.jsoneditor.set(value);
    },
  },
  methods: {
    getOptions() {
      const defaults = {
        escapeUnicode: false,
        history: true,
        indentation: 2,
        mode: modes[0],
        modes: modes.slice(0),
        navigationBar: true,
        search: true,
        statusBar: true,
        sortObjectKeys: false,
      };

      return Object.assign({}, defaults, this.options, {
        onChange: this.onChange,
        onError: this.onError,
      });
    },
    onChange() {
      try {
        const value = this.jsoneditor.get();
        this.$emit('input', value);
        // eslint-disable-next-line
      } catch (e) {
      }
    },
    onError(error) {
      this.$emit('error', error);
    },
  },
  render(h) {
    return h('div', {
      ref: 'jsoneditor',
    });
  },
  mounted() {
    this.jsoneditor = new JSONEditor(
      this.$refs.jsoneditor,
      this.getOptions(),
      this.value,
    );

    this.onChange();
  },
  beforeDestroy() {
    this.jsoneditor.destroy();
    this.jsoneditor = null;
  },
};
</script>

<style scoped lang="less">
@import "~@/style/variables";

/deep/ .jsoneditor {
  height: calc(100vh - 55px);
  border: none;

  .ace_editor {
    min-height: calc(100vh - 118px);
  }

  .jsoneditor-menu {
    background-color: @red-60;
    border-bottom: 1px solid @red-60;
  }

  .jsoneditor-poweredBy {
    display: none;
  }
}
</style>
