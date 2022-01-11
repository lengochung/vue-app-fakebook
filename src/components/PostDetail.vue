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
        
          
            <ScrollView>
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
                    <GridLayout dock="top" columns="*, *, *" style="padding: 30px 0;">
                            <!-- Like -->
                            <GridLayout col="0"  columns="*,auto, *" @tap="likeHandle">
                                <Image src="res://like2" row="0" column="0" class="postIcon" stretch="aspectFill" />
                                <Label text="Thích" row="0" col="1" textWrap="true" class="postlcs"
                                    :style="{ color: post.likeBoolean ? 'blue' : 'black' }" />
                            </GridLayout>
                            <!-- Comment -->
                            <GridLayout col="1"  columns="*, auto, *">
                                <Image src="res://comment" row="0" column="0" class="postIcon" stretch="aspectFill" />
                                <Label text="Bình luận" row="0" col="1" textWrap="true" class="postlcs" />
                            </GridLayout>
                            <!-- Share -->
                            <GridLayout col="2"  columns="*, auto, *">
                                <Image src="res://share" row="0" column="0" class="postIcon" stretch="aspectFill" />
                                <Label text="Chia sẻ" row="0" col="1" textWrap="true" class="postlcs" />
                            </GridLayout>
                    </GridLayout>
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

                    <!--  -->
                        <ListView dock="bottom" for="cmt in post.comments" @itemTap="itemTap" separatorColor="transparent">
                            <v-template>
                                <AbsoluteLayout >
                                    <Image :src="cmt.image"
                                        stretch="aspectFill" class="avatarUser"
                                        top="0" left="20" />
                                    <StackLayout top="0" left="80" width="300">
                                        <Label :text="cmt.uname" textWrap="true" style="font-weight: bold; color: black;" />
                                        <Label :text="cmt.comment" textWrap="true" style="color: black; marign-right: 20px;" />
                                        <Label :text="cmt.time" textWrap="true" style="font-size: 12px;" />
                                    </StackLayout>
                                
                                </AbsoluteLayout>
                            </v-template>
                        </ListView>
                </DockLayout>
            
            </ScrollView>
       
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import methods from '../components-sources/post-postdetail';

import ImagePost from "./ImagePost.vue"
export default {
    props: ["i"],
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
        itemTap({}) {
            console.log(this.post.comments);
        }
        
    },
    created() {
        this.post = this.posts[this.i]
    },
    mounted() {
        setInterval(() => {
            console.log("PostDetail");
            this.post = this.posts[this.i]
        }, 3000);
    },
}
</script>