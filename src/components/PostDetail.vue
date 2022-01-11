<style>
     .nameUser {
        /* margin-top: 15px; */
        font-size: 18px; font-weight: bold;
    }
     .back {
        width: 100px; height: 100px;
    }
</style>

<template>
    <Page>
        <ActionBar>
            <GridLayout columns="*, *, auto, *, *, *, *" >
                <Image src="res://back" stretch="aspectFill" class="back"
                    row="0" column="0" @tap="back"  /> 
                <Image :src="post.image"
                    stretch="aspectFill" class="avatarUser"
                    row="0" column="1" />
                 
                <StackLayout rows="" columns="" row="0" column="2">
                    <Label :text="post.uname" textWrap="true" class="nameUser" />
                    <Label :text="post.date" textWrap="true" class="postDate" style="margin-left: 0;" />
                </StackLayout>
            </GridLayout>
        </ActionBar>
        <DockLayout stretchLastChild="true">
          <ScrollView dock="top" height="500">
                <DockLayout stretchlLastChild="true">
                    
                    <StackLayout dock="top"> 
                        <Label :text="post.content" textWrap="true"
                        style="margin: 40px 40px;" />
                    </StackLayout>
                    <!-- Image of post -->
                    <StackLayout dock="top">
                        <Image :src="post.imagePost" stretch="aspectFill" @tap="tapImage(post)" />
                    </StackLayout>
                    <!-- Line -->
                     <Label class="line" style="margin: 0 30px;" textWrap="true" dock="top" />
                    <!-- Like, comment, share --> 
                    <LikeCommentShare :likeHandle="likeHandle" :likeBoolean="post.likeBoolean" />
                    <!-- Line -->
                     <Label dock="top" class="line" style="margin: 0 30px;" textWrap="true" />
                    <!-- Info likes and comments --> 
                    <GridLayout dock="top" rows="auto, *, auto" columns="auto, *, auto" class="infolikecmt" style="margin: 10px 40px; margin-bottom: 20px; font-weight: bold;">
                        <Image src="res://like" stretch="aspectFill" class="postlikeIcon"  row="0" column="0" />
                        <Label :text="post.textLike" 
                        textWrap="true" class="postlikeText"
                        row="0" column="1" />
                        <Label row="0" column="2" 
                        :text="post.comments.length > 0 ? post.comments.length + ' bình luận' : ''"
                        class="postlikeText" textWrap="true" />
                    </GridLayout>

                    <!-- Comments -->
                        <ListView dock="bottom" for="comment in post.comments"  separatorColor="transparent">
                            <v-template>
                                <Comment :comment="comment" />
                            </v-template>
                        </ListView>
                </DockLayout>
            
            </ScrollView>
            <!--  -->
            <StackLayout dock="bottom">
              <Label text="sldkfjsdf" textWrap="true" />
              <MDBottomNavigation selectedIndex="0">
                  <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
                  <MDTabStrip>
                      <MDTabStripItem>
                          <Image src="res://home" class="fas"></Image>
                          <!-- <Image src="font://&#xf015;" class="fas"></Image> -->
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                          <Image src="res://messenger" class="fas"></Image>
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                          <Image src="res://profile" class="fas"></Image>
                      </MDTabStripItem>
                  </MDTabStrip>

          </MDBottomNavigation>
            </StackLayout>
        </DockLayout> 
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import methods from '../components-sources/post-postdetail';

import Comment from "../component-elements/Comment.vue"
import LikeCommentShare from "../component-elements/LikeCommentShare.vue"
export default {
    props: ["i"],
    components: {
        Comment, LikeCommentShare
    },
    computed: {
        ...mapGetters(["user", "posts"]),
    },
    data: () => ({
        post: {}
    }),
    methods: {
        back() {
            this.$navigateBack({
                    transition: {
                        name: "slideRight", duration: 300, curve: "easeIn" 
                }
            })
        },
        likeHandle: methods.likeHandle, 
        tapImage: methods.tapImage,
    },
    created() {
        this.post = this.posts[this.i]
    },
    mounted() {
        setInterval(() => {
            this.post = this.posts[this.i]
        }, 3000);
    },
}
</script>