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
    background: linear-gradient(to left, orangered, green, lightblue);
    height: 2px; margin: 10px 0 30px 0;
  }
</style>

<template>
 
  <StackLayout class="post">
      
      <GridLayout rows="auto, *, auto" columns="auto, *, auto">
        <Image row="0" column="0"
          :src="'~/assets/images/' + post.image" stretch="aspectFill" class="avatarUser" />
        <StackLayout row="0" column="1">
          <Label class="postUname"
            :text="post.uname" textWrap="true" />
          <Label :text="post.date" textWrap="true" class="postDate" />     
        </StackLayout>
        <Image row="0" column="2"
          src="res://dots" stretch="aspectFill" class="fas postlikeIcon" />
      </GridLayout>
      <!-- Content -->
      <StackLayout> 
        <Label :text="post.content" textWrap="true" 
          style="margin-bottom: 40px; margin-top: 20px;" />
      </StackLayout>
      <!-- Info likes and comments -->
      <GridLayout rows="auto, *, auto" columns="auto, *, auto">
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
      <FlexboxLayout justifyContent="space-between"  flexDirection="row">
        <!-- Like -->
        <GridLayout  columns="*,auto, *" @tap="likeHandle">
          <Image src="res://like2" row="0" column="0" class="postIcon" stretch="aspectFill" />
          <Label text="Thích" row="0" col="1" textWrap="true" class="postlcs"
            :style="{ color: post.likeBoolean ? 'blue' : 'black' }" />
        </GridLayout>
        <!-- Comment -->
        <GridLayout  columns="*, auto, *">
          <Image src="res://comment" row="0" column="0" class="postIcon" stretch="aspectFill" />
          <Label text="Bình luận" row="0" col="1" textWrap="true" class="postlcs" />
        </GridLayout>
        <!-- Share -->
        <GridLayout  columns="*, auto, *">
          <Image src="res://share" row="0" column="0" class="postIcon" stretch="aspectFill" />
          <Label text="Chia sẻ" row="0" col="1" textWrap="true" class="postlcs" />
        </GridLayout>
        
      </FlexboxLayout>
  </StackLayout>
  
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DB from '../APIs'
import helper from "../helpers/vuex"
export default {
    props: ["post", "user"],
    computed: {
      
    },
    data: () => ({

    }),
    methods: {
      likeHandle() {
        let a = []
        a.push(2)
        console.log(a);
        if(this.post.likeBoolean)
          this.post.likes = this.post.likes.filter(like => like.uid !== this.user.uid)
        else
          this.post.likes = [...this.post.likes, this.user]

        this.post.likeBoolean = !this.post.likeBoolean

        this.post.textLike = helper.formatInfoTextLike(this.user, this.post.likes)
      
      },
      ...mapActions(["updateLike"])
    },
}
</script>