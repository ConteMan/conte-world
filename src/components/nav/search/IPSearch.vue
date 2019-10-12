<template>
    <div>
        <a-row type="flex" justify="center" align="middle" class="search">
            <a-col span="12">
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
        name: "IPSearch"
    }
</script>

<style scoped lang="less">
    @color: #d9d9d9;

    @NoBlue:{
        border-color: @color;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .search{
        width: 100%;
        height: 100%;
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
    .selectCom{
        width: 100px !important;
    }
    .searchButton{
        width: 80px !important;
    }
    .inputCom{
        width: calc(100% - 180px) !important;
    }

</style>