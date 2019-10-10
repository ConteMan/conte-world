<template>
    <div class="container">
        <a-row type="flex" justify="center" class="search">
            <a-col span="10">
                <a-input-group compact>
                    <a-select class="selectCom" defaultValue="baidu" size="large">
                        <a-select-option value="baidu">百度</a-select-option>
                        <a-select-option value="google">谷歌</a-select-option>
                    </a-select>
                    <a-input class="inputCom" placeholder="" size="large"></a-input>
                    <a-button class="searchButton" icon="search" size="large"></a-button>
                </a-input-group>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
    @color: #d9d9d9;

    @NoBlue:{
        border-color: @color;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .container{
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        .search{
            width: 100%;
        }
        .selectCom{
            width: 100px;
        }
        .searchButton{
            width: 80px;
        }
        .inputCom{
            width: calc(100% - 180px);
        }
        /deep/ .ant-input{
            border-left: none;
        }
        /deep/ .ant-input:hover,.ant-input:focus,.ant-btn:hover,.ant-btn:focus,.ant-btn:after{
            @NoBlue();
        }
        /deep/ .ant-btn:focus,.ant-btn:hover{
            color: black;
        }
        /deep/ .ant-select-selection:hover,.ant-select-selection:focus,.ant-select-open .ant-select-selection,.ant-select-focused .ant-select-selection,.ant-select-selection:focus, .ant-select-selection:active{
            border-right: none;
            @NoBlue();
        }
        /deep/ .ant-select-focused .ant-select-selection{
            @NoBlue();
        }
    }

</style>