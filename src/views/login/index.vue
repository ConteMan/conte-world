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
                    placeholder="这个用户很强！"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="[
                      'password',
                      { rules: [{ required: true, message: 'Please input your Password!' }] },
                    ]"
                    type="password"
                    placeholder="不要告诉别人！"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" class="login-form-button">
                    Log in
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    import userApi from "@/api/user"
    import { setToken } from "@/untils/auth"

    export default {
        name: "index",
        data() {
            return {
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'login' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            username: values.username,
                            password: values.password,
                        }
                        userApi.login(data).then(
                            response => {
                                let data = response.data.data
                                setToken(data.token)
                                this.$router.push({ path: '/' })
                            }
                        )
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>