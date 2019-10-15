<template>
    <div>
        <a-tabs v-model="activeKey" tabPosition="left" :style="{height: '500px'}" @change="onChange">
            <a-tab-pane v-for="typeItem in types" :tab="typeItem.title" :key="typeItem.id">
                <div style="height: 500px;overflow: auto;">
                    <a-skeleton :loading="!typeInfo[typeItem.id]" active>
                        <a-list
                                itemLayout="horizontal"
                                :dataSource="typeInfo[typeItem.id]"
                        >
                            <a-list-item slot="renderItem" slot-scope="sItem, sIndex">
                                <a :href="sItem.url" target="_blank">{{ sItem.title }}</a>
                            </a-list-item>
                        </a-list>
                    </a-skeleton>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import { mapState,mapGetters } from "vuex"

    export default {
        name: "TopListTab",
        components:{
        },
        data(){
            return {
                loading: true,
                activeKey: "1"
            }
        },
        mounted() {
            this.getTypes()
            this.getTypeInfo()
        },
        computed: {
            ...mapState({
                types: state => state.topList.types,
                typeInfo: state => {
                    return state.topList.infos
                }
            })
        },
        methods:{
            getTypes: function () {
                this.$store.dispatch('getTypes')
            },
            getTypeInfo: function () {
                this.$store.dispatch('getTypeInfo', this.activeKey)
            },
            onChange(activeKey){
                if (this.typeInfo[activeKey] == undefined){
                    console.log('reload')
                    this.getTypeInfo()
                }
            }
        },
        watch: {
            typeInfo: function () {
                console.log('refresh')
            }
        }
    }
</script>

<style scoped>

</style>