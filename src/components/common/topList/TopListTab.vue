<template>
    <div>
        <a-tabs v-model="activeKey" tabPosition="left" @change="onChange">
            <a-tab-pane v-for="typeItem in types" :tab="typeItem.title" :key="typeItem.id">
                <top-list-list v-bind:data="typeInfo[typeItem.id]" v-bind:id="typeItem.id"></top-list-list>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import { mapState,mapGetters } from "vuex"
    import TopListList from "./TopListList";

    export default {
        name: "TopListTab",
        components:{
            TopListList
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
                console.log(this.typeInfo[activeKey])
                if (this.typeInfo[activeKey] == undefined){
                    this.getTypeInfo()
                } else {
                    console.log('+++++')
                }
            }
        },
        watch: {
            typeInfo: function () {
                console.log('------------')
            }
        }
    }
</script>

<style scoped>

</style>