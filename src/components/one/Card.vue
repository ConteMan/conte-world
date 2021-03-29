<template>
  <div>
    <a-skeleton
      class="skeleton"
      :loading="false"
      :avatar="false"
      :title="false"
      active
      :paragraph="{rows: 6, width:['100%', '60%', '60%', '100%', '100%', '100%']}"
    />
    <div class="card-container" v-show="!imageLoading">
      <div class="tool-bar" @click="ones">
        <a-icon class="tool-icon" type="reload" :spin="loading"/>
      </div>
      <div class="one">
        <div class="content">{{ one.content }}</div>
        <br>
        {{ one.text_authors }}
      </div>
    </div>
  </div>

</template>

<script>
import oneApi from '@/api/one';

export default {
  name: 'Card',
  data() {
    return {
      one: {},
      loading: false,
      imageLoading: false,
    };
  },
  methods: {
    ones() {
      this.loading = true;
      this.imageLoading = false;
      oneApi.ones().then(
        (response) => {
          this.one = response.data.data;
          this.loading = false;
        }
      );
    },
    showLoad() {
      setTimeout(() => {
        this.imageLoading = false;
        this.loading = false;
      }, 800);
    }
  },
  created() {
    this.ones();
  },
};
</script>

<style scoped lang="less">
@import "~@/style/variables";

/deep/ .ant-skeleton-paragraph {
  padding-inline-start: 0 !important;
}

.card-container, .skeleton {
  margin: auto;
  max-width: 800px;
}

.one {
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: @font-color-grey;
  text-align: center;
  margin: 10% 0;

  .img-container {
    padding: 40px 0;
    width: 100%;

    img {
      width: 100%;
    }

    div {
      padding: 10px 0;
    }
  }

  .content {
    position: relative;
  }

  .content::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: -0.25em;
    right: -0.25em;
    background-color: @red-20;
    transform-origin: center;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  .content:hover::before {
    transform: scaleX(1);
    transform-origin: center;
  }

  .content:hover {
    color: white;
  }
}

.tool-bar {
  text-align: center;
  height: 20px;

  .title {
    float: left;
    display: inline-block;
    width: 60px;
    text-align: left;

    a, a:visited {
      color: @font-color-grey;
    }

    a:hover {
      color: @red;
    }
  }

  .date {
    display: inline-block;
    margin-left: -60px;
  }

  .tool-icon {
    float: right;
    line-height: 22px;
  }
}

.dark-theme {
  .one {
    color: @dark-theme-color;
  }

  .tool-bar {
    .tool-icon {
      color: @dark-theme-color;
    }
  }
}
</style>
