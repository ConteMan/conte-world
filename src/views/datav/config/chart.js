import fa from "element-ui/src/locale/lang/fa";

const chartOptions = {
    //类型 饼图
    genresPie:{
        tooltip: {
            trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            top: 10,
            left: 10,
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
            {
                name:'收藏数量',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                ]
            },
            {
                name:'类型',
                type:'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        show: true
                    }
                },
                data:[
                ]
            }
        ],
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //年份 南丁格尔玫瑰图
    yearPieRoseType: {
        title : {
            text: '',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 10,
            left: 10,
            x : 'left',
            orient: 'vertical',
            data:['rose1','rose2','rose3','rose4']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {
                    show: false,
                    type: ['pie', 'funnel']
                },
                restore : {show: false},
                saveAsImage : {show: false}
            }
        },
        calculable : true,
        series : [
            {
                name:'面积模式',
                type:'pie',
                radius : [30, 90],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                ]
            }
        ],
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //年份走势 折线图
    yearLine: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 10,
            left: 10,
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    show: false
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ],
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //年份、类型 折柱混合图
    yearGenresMixLine: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: false, readOnly: false},
                magicType: {show: false, type: ['line', 'bar']},
                restore: {show: false},
                saveAsImage: {show: false}
            }
        },
        legend: {
            top: 10,
            left: 10,
            data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ],
        grid: {
            bottom: 30,
            left: 60,
            right: 50
        },
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //上映月份，雷达图
    pubdateRadar: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 10,
            left: 10,
            x : 'left',
            orient: 'vertical',
            data:['降水量','蒸发量']
        },
        radar:
        {
            indicator: (function (){
                var res = [];
                for (var i = 1; i <= 12; i++) {
                    res.push({text:i+'月',max:100});
                }
                return res;
            })(),
            radius: 80
        },
        series:
        {
            type: 'radar',
            radarIndex: 0,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [
                {
                    name: '降水量',
                    value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                },
                {
                    name:'蒸发量',
                    value:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                }
            ]
        },
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //实时增长速度，仪表盘
    collectionGauge: {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        series: [
            {
                name: '业务指标',
                title: '业务指标',
                type: 'gauge',
                center: ['20%', '55%'],    // 默认全局居中
                detail: {
                    formatter:'{value}%',
                    fontSize: 12,
                    offsetCenter: [0, "80%"],
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                data: [{value: 70, name: ''}]
            },
            {
                name: '业务指标',
                type: 'gauge',
                center: ['50%', '50%'],
                detail: {
                    formatter:'{value}%',
                    width: 100,
                    color: '#eee',
                    fontSize: 20,
                    offsetCenter: [0, "80%"],
                    rich: {}
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 12
                    }
                },
                splitLine: {           // 分隔线
                    length:16,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel:{
                    backgroundColor: 'auto',
                    borderRadius: 2,
                    color: '#eee',
                    padding: 3,
                    textShadowBlur: 2,
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                    textShadowColor: '#222'
                },
                data: [{value: 50, name: ''}]
            },
            {
                name: '业务指标',
                type: 'gauge',
                center: ['80%', '55%'],
                detail: {
                    formatter:'{value}%',
                    fontSize: 12,
                    offsetCenter: [0, "80%"],
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                data: [{value: 40, name: ''}]
            }
        ],
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    //近十年统计，堆叠柱状图
    tenYearBarStack: {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            top: 10,
            left: 10,
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            top: '15%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'邮件营销',
                type:'bar',
                stack: '广告',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'bar',
                stack: '广告',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'bar',
                stack: '广告',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'搜索引擎',
                type:'bar',
                data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            },
            {
                name:'百度',
                type:'bar',
                barWidth : 5,
                stack: '搜索引擎',
                data:[620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
                name:'谷歌',
                type:'bar',
                stack: '搜索引擎',
                data:[120, 132, 101, 134, 290, 230, 220]
            },
            {
                name:'必应',
                type:'bar',
                stack: '搜索引擎',
                data:[60, 72, 71, 74, 190, 130, 110]
            },
            {
                name:'其他',
                type:'bar',
                stack: '搜索引擎',
                data:[62, 82, 91, 84, 109, 110, 120]
            }
        ],
        backgroundColor: "rgba(0, 0, 0, 0)"
    }
}

export default chartOptions;