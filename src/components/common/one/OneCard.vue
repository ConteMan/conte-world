<template>
    <div>
        <a-card
            hoverable
            style="width: 100%"
            :loading="loading"
        >
            <a-divider>{{ oneData.title }}</a-divider>
            <blockquote>{{ oneData.text }}</blockquote>
            <p>{{ oneData.text_authors }}</p>
            <p>{{ des }}</p>
            <p style="text-align: right;margin-right: 5px;">
                <a-button class="reload" shape="circle" icon="reload" v-on:click="reload"/>
            </p>
        </a-card>
    </div>
</template>

<script>
    export default {
        name: "OneCard",
        data(){
            return {
                loading: true,
                oneData: {},
            }
        },
        mounted(){
            this.one()
        },
        computed:{
            des: function (){
                return '[' + this.oneData.date + ']'
            }
        },
        methods:{
            changeLoading(){
                this.loading = !this.loading
            },
            one(){
                var _this = this
                this.$api.one.ones().then(
                    (response) => {
                        _this.oneData = response.data
                        setTimeout(function () {
                            _this.loading = false
                        }, 1000)

                    }
                )
            },
            reload(){
                this.loading = true
                this.one()
            }
        }
    }
</script>

<style scoped lang="less">
    .reload,.reload:hover,.reload:focus{
        border: none;
        background-color: white;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
</style>