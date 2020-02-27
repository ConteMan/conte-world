<template>
    <div>
        <div class="back-header">
            <div class="back-btn" @click="$router.push({ name: 'Article' })">
                <a-icon type="left" />
            </div>
            <div class="title">
                {{ title }}
            </div>
        </div>
        <iframe :srcdoc="data" style="width: 100%;height: calc(100vh - 4px); border: none;" frameborder="0" scrolling="auto"></iframe>
    </div>
</template>

<script>
    import yuqueApi from "@/api/yuque"

    export default {
        name: "index",
        data() {
            return {
                data: '',
                title: '',
            }
        },
        created() {
            this.detail()
        },
        methods: {
            turnTo(params) {
                this.$route.push(params)
            },
            detail() {
                yuqueApi.docDetail(this.$route.params.id).then(
                    responese => {
                        this.data = responese.data.data.body_html
                        this.title = responese.data.data.title
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>