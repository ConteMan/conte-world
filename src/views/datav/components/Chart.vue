<template>
    <div :id="idName" style="width:100%;height:100%;"></div>
</template>

<script>
    export default {
        name: "Chart",
        mounted(){
            this.init()
        },
        methods: {
            init(){
                this.chart = this.$echarts.init(document.getElementById(this.idName), this.$eDark)
                this.chart.showLoading()
            }
        },
        watch:{
            option: function (n) {
                this.chart.setOption(n)
                this.chart.hideLoading()
            }
        },
        data(){
            return {
                chart: null
            }
        },
        props: {
            idName:{
                type: String,
                required: true
            },
            option:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>