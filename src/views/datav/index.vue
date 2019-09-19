<template>
    <div class="main">
        <Particles></Particles>
        <Header></Header>
        <div class="d-main">
            <div class="d-left">
                <div class="row-c">
                    <Module>
                        <template v-slot:header>年份占比</template>
                        <template v-slot:content>
                            <Chart idName="yearPieRoseType" :option="yearPieOption"></Chart>
                        </template>
                    </Module>
                </div>
                <div class="row-divider"></div>
                <div class="row-h row-margin">
                    <Module>
                        <template v-slot:header>近十年统计</template>
                        <template v-slot:content>
                            <Chart idName="tenYearBarStack" :option="tenYearBarStackOption"></Chart>
                        </template>
                    </Module>
                </div>
            </div>
            <div class="d-mid">
                <div class="row-c flexCenter cntBg">
                    <div class="showCnt">
                        统计数据数量：<CountUp :end="cntEnd" :options="cntOption"></CountUp>
                    </div>
                </div>
                <div class="row-divider"></div>
                <div class="row-c">
                    <Module>
                        <template v-slot:header>收藏动态</template>
                        <template v-slot:content>
                            <Chart idName="collectionGauge" :option="collectionGaugeOption"></Chart>
                        </template>
                    </Module>
                </div>
                <div class="row-divider"></div>
                <div class="row-c">
                    <Module>
                        <template v-slot:header>影片类型 与 收藏</template>
                        <template v-slot:content>
                            <Chart idName="GenresPie" :option="genresPieOption"></Chart>
                        </template>
                    </Module>
                </div>
            </div>
            <div class="d-right">
                <div class="row-c">
                    <Module>
                        <template v-slot:header>年份走势</template>
                        <template v-slot:content>
                            <Chart idName="yearLine" :option="yearLineOption"></Chart>
                        </template>
                    </Module>
                </div>
                <div class="row-divider"></div>
                <div class="row-c">
                    <Module>
                        <template v-slot:header>年份 与 类型</template>
                        <template v-slot:content>
                            <Chart idName="yearGenresMixLine" :option="yearGenresMixLineOption"></Chart>
                        </template>
                    </Module>
                </div>
                <div class="row-divider"></div>
                <div class="row-c">
                    <Module>
                        <template v-slot:header>上映月份</template>
                        <template v-slot:content>
                            <Chart idName="pubdateRadar" :option="pubdateRadarOption"></Chart>
                        </template>
                    </Module>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./Header"
    import Module from "./components/Module"
    import Chart from "./components/Chart"
    import ChartConfigs from "./config/chart"
    import Particles from "./Particles"
    import CountUp from "./components/CountUp"
    import base from "../../api/base";

    export default {
        name: "index",
        components: {
            CountUp,
            Particles,
            Header,
            Module,
            Chart
        },
        data(){
            return {
                genresPieOption: {},
                yearPieOption: {},
                yearLineOption: {},
                yearGenresMixLineOption: {},
                pubdateRadarOption: {},
                collectionGaugeOption: {},
                tenYearBarStackOption: {},
                cntEnd: 0,
                cntOption: {
                    startVal: 0,
                    duration: 15,
                    separator: ','
                }
            }
        },
        beforeCreate(){
            document.title = this.$route.meta.title || "title is missing"
        },
        mounted(){
            this.getGenresPieOption()
            this.getYearPieOption()
            this.getYearLineOption()
            this.getYearGenresMixLineOption()
            this.getPubdateRadarOption()
            this.getCollectionGaugeOption()
            this.getTenYearBarStackOption()
            this.initWebSocket()
        },
        methods: {
            getGenresPieOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.genresPieOption = ChartConfigs.genresPie
                        that.genresPieOption.legend.data = response.data.legend
                        that.genresPieOption.series[1].data = response.data.series[0]
                        that.genresPieOption.series[0].data = response.data.series[1]
                    }
                )
            },
            getYearPieOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.yearPieOption = ChartConfigs.yearPieRoseType
                    }
                )
            },
            getYearLineOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.yearLineOption = ChartConfigs.yearLine
                    }
                )
            },
            getYearGenresMixLineOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.yearGenresMixLineOption = ChartConfigs.yearGenresMixLine
                    }
                )
            },
            getPubdateRadarOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.pubdateRadarOption = ChartConfigs.pubdateRadar
                    }
                )
            },
            getCollectionGaugeOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.collectionGaugeOption = ChartConfigs.collectionGauge
                    }
                )
            },
            getTenYearBarStackOption(){
                var that = this
                this.$api.movie.genresForPie().then(
                    (response) => {
                        that.tenYearBarStackOption = ChartConfigs.tenYearBarStack
                    }
                )
            },
            //websocket 获取数量
            initWebSocket(){
                var websocket = new WebSocket(`${base.websocket}/datav`)
                this.$store.commit('movie/setWebsocket', websocket)
                websocket.onopen = this.websocketonopen;
                websocket.onmessage = this.websocketonmessage;
                websocket.onclose = this.websocketclose;
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                this.send_default()
            },
            websocketonmessage(e){
                console.log(e.data)
                this.$store.commit('movie/setData',JSON.parse(e.data))
            },
            websocketsend(data){
                console.log(111111)
                this.$store.state.movie.websocket.send(data)
            },
            websocketclose(){
                console.log(2222)
                this.$store.state.movie.websocket.close()
            },
            send_default(){ //默认请求
                let actions = {
                    "cmd":"datav.number",
                    "data": "",
                    'ext': [],
                }
                this.websocketsend(JSON.stringify(actions))
            }
        },
        destroyed() {
            this.websocketclose()
        },
        watch:{
            "$store.state.movie.data":function(){
                var data = this.$store.state.movie.data
                var cnt = data.cnt
                if(cnt){
                    this.cntOption.startVal = this.cntEnd
                    this.cntEnd = cnt
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .main
        background: url(../../assets/img/datav/bg.png) repeat-x
        height 100vh
        text-align center
        overflow-y hidden
        z-index -1
    .row-c
        height calc((100% - 7rem)/3)
    .row-h
        height calc(100% - (100% - 7rem)/3 - 5rem)
    .row-divider
        height 2rem
    .d-main
        padding 1rem
        height calc(100% - 4rem)
    .d-left
        width 25%
        height 100%
        display inline-block
        float left
    .d-right
        width 25%
        height 100%
        float right
    .d-mid
        width 45%
        height 100%
        display inline-block
    .noBorder
        border none;
    .showCnt
        font-size 20px
        color cornflowerblue

    .flexCenter
        display flex
        justify-content center
        align-items center
    .cntBg
        background: url(../../assets/img/datav/content-frame1.png) no-repeat
        background-size 100% 100%
        text-align center
        overflow-y hidden
</style>