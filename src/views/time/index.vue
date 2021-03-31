<template>
  <div class="time-container">
    <div
      class="time-text"
      :style="{ 'font-size': fontSize + 'px', 'font-family': fontFamily }"
    >
      {{ current }}
    </div>

    <div class="back">
      <a-icon type="left" @click="$router.push({ path: '/' })"/>
    </div>

    <div class="setting">
      <a-icon type="setting" @click="visible = true;"/>
    </div>

    <a-drawer
      title="Time"
      placement="right"
      width="400"
      wrapClassName="drawer-container"
      :get-container="getContainer"
      :closable="false"
      :visible="visible"
      @close="drawClose"
    >
      <a-row>
        <a-col class="label" :span="24">
          格式
        </a-col>
        <a-col class="field" :span="24">
          <a-input v-model="format" />
        </a-col>
        <a-col class="label" :span="24">
          大小
        </a-col>
        <a-col class="field" :span="24">
          <a-input v-model="fontSize" suffix="px"/>
        </a-col>
        <a-col class="label" :span="24">
          字体
        </a-col>
        <a-col class="field" :span="24">
          <a-select
            class="select"
            v-model="fontType"
            @change="changeFontType"
          >
            <a-select-option v-for="item in fontTypes" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
          </a-select>
        </a-col>
        <a-col class="action" :span="24">
          <a-button type="link" @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'Time',
  data() {
    return {
      current: '',
      timer: undefined,
      visible: false,

      default: {
        format: 'HH:mm:ss',
        fontSize: 80,
        fontType: 'mono',
      },

      fontTypes: [
        {
          name: '衬线',
          value: 'serif',
        },
        {
          name: '非衬线',
          value: 'san-serif',
        },
        {
          name: '等宽',
          value: 'mono',
        }
      ],
      fontFamilyTypes: {
        'serif': 'serif',
        'san-serif': '"更纱黑体 SC", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", "sans-serif"',
        'mono': 'Cousine',
      },

      times: 0,
      format: 'HH:mm:ss',
      fontSize: 80,
      fontType: 'mono'
    };
  },
  computed: {
    fontFamily() {
      return this.fontFamilyTypes[this.fontType];
    }
  },
  created() {
    this.timer = window.setInterval(this.setTime, 1000);
  },
  watch: {
    format(target) {
      console.log({ format: target });
    }
  },
  methods: {
    ...mapMutations('app', {
      loadingAction: MT.LOADING,
    }),
    getTime({ format = 'HH:mm:ss' } = {}) {
      return dayjs().format(format);
    },
    setTime() {
      const _this = this;
      _this.current = _this.getTime({ format: _this.format });
      _this.times++;
      if (_this.times < 2) {
        _this.loadingAction(false);
      }
    },
    drawClose() {
      this.visible = false;
    },
    getContainer(el) {
      return document.querySelector('.time-container');
    },
    reset() {
      const keys = Object.keys(this.default);
      for (const item of keys) {
        this[item] = this.default[item];
      }
      return true;
    },
    changeFontType(value) {
      this.fontType = value;
    },
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
