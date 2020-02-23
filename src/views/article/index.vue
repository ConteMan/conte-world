<template>
    <div>
        <div v-for="item in data">
            <a @click="turnTo({name: 'ArticleDetail', params: {id: item.slug}})" style="cursor: pointer;">{{ item.title }} {{ item.slug }}</a>
        </div>
    </div>
</template>

<script>
    import yuqueApi from "@/api/yuque"
    export default {
        name: "index",
        data() {
            return {
                data: []
            }
        },
        created() {
            this.list()
        },
        methods: {
            turnTo(params) {
              this.$router.push(params)
            },
            list() {
                yuqueApi.docs().then(
                    responese => {
                        this.data = responese.data.data
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>