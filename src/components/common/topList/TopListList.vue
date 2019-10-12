<template>
    <a-list
            itemLayout="horizontal"
            :dataSource="dataSource"
    >
        <a-list-item slot="renderItem" slot-scope="item, index">
            {{ item.title }}
        </a-list-item>
    </a-list>
</template>

<script>
    export default {
        name: "TopListList",
        props:{
            data: {
                type: Array
            },
            id: {
                type: String
            }
        },
        computed: {
            dataSource(){
                return this.data
            }
        }
    }
</script>

<style scoped>

</style>