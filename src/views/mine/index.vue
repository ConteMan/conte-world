<template>
    <div>
        {{ data.id }}
        <br>
        {{ data.username }}
    </div>
</template>

<script>
    import userApi from "@/api/user"

    export default {
        name: "index",
        data() {
            return {
                data: {},
            }
        },
        methods: {
            info() {
                userApi.info().then(
                    response => {
                        this.data = response.data.data
                    }
                )
            }
        },
        created() {
            this.info()
        }
    }
</script>

<style scoped>

</style>