<style>
  .postUname {
    font-weight: bold;
    margin-left: 20px;
    margin-top: 10px;
  }
  .postImg {
    text-align: right;
  }
  .postDate {
    font-size: 12px; margin-left: 20px; color: rgb(44, 43, 43);
  }
  .postlikeText {
    font-size: 12px; margin-left: 20px; margin-top: 6px;; color: rgb(44, 43, 43);
  }
  .postlikeIcon {
    width: 60px; height: 60px; border-radius: 360px; 
  }
  .postIcon {
    width: 80px; height: 80px; border-radius: 360px; margin-left: 60px;
  }
  .postlcs {
    margin-top: 20px; margin-left: 60px;
  }
  .line {
    background: linear-gradient(to left, rgb(19, 18, 18), rgb(23, 24, 23), rgb(26, 27, 27));
    height: 2px; margin: 10px 0 30px 0;
  }
  .infolikecmt {
    margin-top: 25px;
  }
</style>

<template>
 
  <StackLayout class="post">
        <!-- Avatar and name author post -->
        <StackLayout>
            <GridLayout rows="auto, *, auto" columns="auto, *, auto">
                <ImageUser :image="post.image" :status="post.status" row="0" column="0" />
                <StackLayout row="0" column="1">
                <Label class="postUname" @tap="goUserOther(post)"
                    :text="post.uname" textWrap="true" />
                <Label :text="post.date" textWrap="true" class="postDate" />     
                </StackLayout>
                <Image row="0" column="2"
                src="res://dots" stretch="aspectFill" class="fas postlikeIcon" />
            </GridLayout>
        </StackLayout>
        <!-- Content -->
        <StackLayout @tap="tapPost"> 
            <Label :text="post.content" textWrap="true" 
            style="margin-bottom: 40px; margin-top: 20px;" />
        </StackLayout>
        <!-- Image of post -->
        <StackLayout>
            <Image :src="post.imagePost" stretch="aspectFill" @tap="tapImage(post)" />
        </StackLayout>
        
        <!-- Info likes and comments --> 
        <GridLayout rows="auto, *, auto" columns="auto, *, auto" class="infolikecmt" @tap="tapPost">
            <Image src="res://like" stretch="aspectFill" class="postlikeIcon"  row="0" column="0" />
            <Label :text="post.textLike" 
            textWrap="true" class="postlikeText"
            row="0" column="1" />
            <Label row="0" column="2"
            :text="post.comments.length > 0 ? post.comments.length + ' bình luận' : ''"
            class="postlikeText" textWrap="true" />
        </GridLayout>
        <Label class="line" textWrap="true" />
        
        <!-- Like, comment, share -->
        <LikeCommentShare :likeBoolean="post.likeBoolean" :likeHandle="likeHandle" />
        <!-- <Label class="line" textWrap="true" /> -->
  </StackLayout>
  
</template>

<script>

import DB from '../APIs'
import helper from "../helpers"
import methods from '../components-sources/post-postdetail'

import LikeCommentShare from "./LikeCommentShare.vue"

import ImageUser from "../component-elements/ImageUser.vue"
import UserOther from "../components/UserOther.vue"
import PostDetail from "../components/PostDetail.vue"

export default {
    props: ["post", "user", "i"],
    components: {
      LikeCommentShare, ImageUser
    },
    computed: {
      
    },
    data: () => ({

    }),
    methods: {
        likeHandle: methods.likeHandle,
        tapImage: methods.tapImage,
        goUserOther(post) {
            this.$navigateTo(UserOther, { 
                props: {
                    other: post
                }
            })
        }, 
        tapPost() {
                this.$navigateTo(PostDetail, { 
                    props: { i: this.i },
                    transition: {
                        name: "slideLeft", duration: 300, curve: "easeIn" 
                    }
                })
            }
    },
}
</script>