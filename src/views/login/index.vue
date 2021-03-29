<template>
  <div>
    <div class="list-header">
      登录
    </div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your username!' }] },
          ]"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button block size="small" type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import userApi from '@/api/user';
import { setToken } from '@/utils/auth';

export default {
  name: 'Index',
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            username: values.username,
            password: values.password,
          };
          userApi.login(data).then(
            response => {
              if (response.data.status === 200) {
                const data = response.data.data;
                setToken(data.token);
                this.$router.push({ path: '/' });
              }
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/index";

/deep/ .login-form {
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

  input {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: unset;
    box-shadow: unset;
  }
}
</style>
