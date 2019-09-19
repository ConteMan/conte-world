<template>
    <ve-line :data="chartData" :theme="theme"></ve-line>
</template>

<script>
    import veLine from 'v-charts/lib/line.common'
    export default {
        name: "VchartsLine",
        components: {
            veLine
        },
        data(){
            return {
                chartData: {},
                websock: null,
                interObj: null,
                theme: this.$vDarkTheme
            }
        },
        created() {
            this.initWebSocket()
            var that = this
            this.interObj = setInterval(function () {
                that.websock ? that.send_default() : clearInterval(that.interObj)
            }, 3000)
        },
        destroyed() {
            this.clear()
        },
        methods: {
            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://192.168.1.89:18308/vcharts"
                this.websock = new WebSocket(wsuri)
                this.websock.onmessage = this.websocketonmessage
                this.websock.onopen = this.websocketonopen
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
               this.send_default()
            },
            websocketonerror(){ //连接建立失败关闭
                this.clear()
            },
            websocketonmessage(e){ //数据接收
                this.chartData = JSON.parse(e.data)
            },
            websocketsend(Data){ //数据发送
                this.websock.send(Data)
            },
            websocketclose(){ //关闭
                this.clear()
            },
            send_default(){ //默认请求
                let actions = {
                    "cmd":"line.data",
                    "data": "",
                    'ext': [],
                }
                this.websocketsend(JSON.stringify(actions))
            },
            clear(){ //清理定时器和 websock
                clearInterval(this.interObj)
                if (this.websock) this.websock.close()
                this.websock = null
            }
        }
    }
</script>

<style scoped>

</style>