<template>
    <div>
        <iframe :srcdoc="data" style="width: 100%;height: calc(100vh - 4px); border: none;" frameborder="0" scrolling="auto"></iframe>
    </div>
</template>

<script>
    import yuqueApi from "@/api/yuque"

    export default {
        name: "index",
        data() {
            return {
                data: ''
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
                console.log(this.$route)
                yuqueApi.docDetail(this.$route.params.id).then(
                    responese => {
                        this.data = responese.data.data.body_html
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>