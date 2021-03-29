<template>
  <div>
    <tab-header v-bind="{active: active}"/>
    <div>
      <a-form class="list-form" :form="form" layout="vertical">
        <template v-for="(cat,index) in setting">
          <a-form-item :key="index" class="title">
            {{ cat.title }}
          </a-form-item>
          <a-form-item
            class="item"
            v-bind="formItemLayout"
            v-for="item in cat.fields"
            :label="item.name"
            :key="item.code"
          >
            <a-input
              v-decorator="[String(item.code)]"
            />
          </a-form-item>
        </template>
      </a-form>
      <div class="submit">
        <a-button size="small" @click="submit">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
import TabHeader from './components/TabHeader';

export default {
  name: 'Setting',
  components: {
    TabHeader
  },
  data() {
    return {
      data: {},
      active: this.$route.name,
      setting: [
        {
          name: 'social',
          title: '社交',
          fields: [
            {
              name: 'QQ',
              code: 'qq',
            },
            {
              name: 'Telegram',
              code: 'teltegram',
            },
            {
              name: 'v2ex',
              code: 'v2ex',
            },

          ],
        }
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
    };
  },
  methods: {
    info() {
      userApi.setting().then(
        response => {
          const resSetting = response.data.data;
          const fields = {};
          this.setting.forEach((item, index) => {
            if (resSetting[item.name]) {
              item.fields.forEach((sItem, sIndex) => {
                if (resSetting[item.name][sItem.code]) {
                  fields[sItem.code] = resSetting[item.name][sItem.code];
                }
              });
            }
          });
          this.$nextTick(() => {
            this.form.setFieldsValue(fields);
          });
        }
      );
    },
    submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {};
          this.setting.forEach((item, index) => {
            const temp = {};
            item.fields.forEach((sItem, sIndex) => {
              if (values[sItem.code]) {
                temp[sItem.code] = values[sItem.code];
              }
            });
            data[item.name] = temp;
          });
          userApi.updateSetting(data).then(
            response => {
              if (response.data.status === 200) {
                this.$message.success('更新成功！');
              }
            }
          );
        }
      });
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'settingForm' });
  },
  async mounted() {
    await this.info();
  }
};
</script>

<style scoped lang="less">
@import "~@/style/index";

/deep/ .list-form {
  .ant-form-item {
    font-size: 12px;
    padding: 10px 20px 0 20px;
  }

  .ant-input, label {
    font-size: 12px;
  }

  .title {
    padding: 15px 20px;
    font-size: 16px;
    font-weight: @font-bold;
    margin: 0;

    .ant-form-item-control {
      line-height: 24px;
    }
  }

  .item {
    border-top: 1px solid @border-color;

    input {
      border-left: none;
      border-right: none;
      border-top: none;
      border-radius: unset;
      box-shadow: unset;
    }
  }
}

.submit {
  padding: 15px 20px;
  bottom: 0;
}
</style>
