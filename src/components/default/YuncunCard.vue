<template>
    <el-row type="flex" justify="center">
        <el-col :span="8" class="yuncun-card">
            <el-card :body-style="{ padding: '0px' }" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)">
                <div class="image-div" v-on:click="timeComment">
                    <img :src="info.images" class="image">
                </div>
                <el-collapse v-model="activeNames" v-if="info.title">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="song-title" v-if="!longTitle">&nbsp;&nbsp;《{{ info.title }}》 {{ info.author }}</span>
                            <div class="song-title" v-else>
                                <div class="single-title">&nbsp;&nbsp;《{{ info.title }}》</div>
                                <div>&nbsp;&nbsp;{{ info.author }}</div>
                            </div>
                        </template>
                        <el-table
                                :data="tableData"
                                stripe
                                :showHeader="false"
                                v-if="tableData.length > 0"
                                class="">
                            <el-table-column
                                    prop="name"
                                    label=""
                                    width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="value"
                                    label=""
                            >
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
                <div>
                    <div class="bottom clearfix">
                        <blockquote class="comment" v-if="info.comment_content">{{ info.comment_content }}
                            <br><a :href="'https://music.163.com/#/user?id='+info.comment_user_id" target="_blank"><p class="comment-user">{{'@'+info.comment_nickname }}</p></a>
                        </blockquote>
                    </div>
                </div>
                <el-divider class="divider-no" />
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "YuncunCard",
        data(){
            return {
                activeNames: [],
                loading: true,
                info: {},
                tableData: [],
                infoTranslate:{
                    album: "专辑",
                    author: "歌手",
                    comment_avatar_url: "评论者头像",
                    comment_content: "评论",
                    comment_id: "评论 ID",
                    comment_liked_count: "评论获赞数",
                    comment_nickname: "评论者昵称",
                    comment_pub_date: "评论时间",
                    comment_user_id: "评论者 ID",
                    description: "歌曲描述",
                    images: "歌曲封面图",
                    mp3_url: "歌曲 MP3 地址",
                    pub_date: "歌曲发布时间",
                    song_id: "歌曲 ID",
                    title: "歌曲标题",
                },
                longTitle: false
            }
        },
        mounted(){
            this.timeComment()
        },
        methods: {
            comments(that){
                that.$axios.get('https://api.comments.hk/')
                    .then( (response) => {
                        that.info = response.data
                        that.tableFormat()
                        that.titleFormat()
                        that.$notify({
                            title: 'Get!',
                            //message: 'Get!',
                            type: 'success'
                        })
                    })
            },
            timeComment(){
                var that = this
                that.loading = true
                setTimeout(function (){
                    that.comments(that)
                },500)
                setTimeout(function (){
                    that.loading = false
                }, 1200)
            },
            tableFormat(){
                this.tableData = []
                for (let i in this.info){
                    this.tableData.push({'name':this.infoTranslate[i], 'value':this.info[i]})
                }
            },
            titleFormat(){
                this.longTitle = (this.info.title + this.info.author).length > 15
            }
        }
    }
</script>

<style scoped lang="stylus">
    .song
        font-size 12px
    .song-title
        color #9e9e9e
    .single-title
        height 20px
    .divider
        margin 5px 0 0 0
    .divider-no
        margin 0
    .image
        height 355px
    .image-div
        width 350px
        height 350px
        overflow hidden
    .yuncun-card
        width 350px
    .comment
        font-size 12px
        text-align left
        margin 0
        a
            text-decoration:none
            color black
        a:hover
            color crimson
    .comment-user
        text-align right
        margin-block-end 0
    blockquote
        background #f9f9f9;
        border-left 10px solid #ccc;
        margin 1.5em 10px;
        padding 0.5em 10px;
        quotes "\201C""\201D""\2018""\2019";
    blockquote:before
        color #ccc;
        content open-quote;
        font-size 4em;
        line-height 0.1em;
        margin-right 0.25em;
        vertical-align -0.4em
</style>