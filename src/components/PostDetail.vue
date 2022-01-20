<style>
     .nameUser {
        /* margin-top: 15px; */
        font-size: 18px; font-weight: bold;
    }
     .back {
        width: 100px; height: 100px;
    }
    .formComment {
        padding: 15px 30px 0 30px; 
        background: rgb(219, 217, 217)
    }
    .sumLike {
        font-weight: bold; margin: 20px 0 40px 20px;
    }
</style>

<template>
    <Page>
        <ActionBar>
            <GridLayout columns="*, *, auto, *, *, *, *" >
                <Image src="res://back" stretch="aspectFill" class="back"
                    row="0" column="0" @tap="back"  /> 
                <!-- <Image :src="post.image"
                    stretch="aspectFill" class="avatarUser"
                    row="0" column="1" /> -->
                <ImageUser :image="post.image" :status="post.status" row="0" column="1" />
                 
                <StackLayout rows="" columns="" row="0" column="2">
                    <Label :text="post.uname" textWrap="true" class="nameUser" />
                    <Label :text="post.date" textWrap="true" class="postDate" style="margin-left: 0;" />
                </StackLayout>
            </GridLayout>
        </ActionBar>
        <DockLayout stretchLastChild="true">
          <ScrollView dock="top" :height="heightScroll">
                <DockLayout dock="top" stretchlLastChild="true">
                    
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
                    <GridLayout dock="top" rows="auto, *, auto" columns="auto, *, auto" 
                        class="infolikecmt" style="margin: 10px 40px; margin-bottom: 20px; font-weight: bold;"
                        
                    >
                        <Image src="res://like" stretch="aspectFill" class="postlikeIcon"  row="0" column="0" />
                        <Label :text="post.textLike" @tap="showlistLikes"
                            textWrap="true" class="postlikeText"
                            row="0" column="1" />
                        <Label row="0" column="2"
                            :text="post.comments.length > 0 ? post.comments.length + ' bình luận' : ''"
                            class="postlikeText" textWrap="true" />
                    </GridLayout>
                    
                    <!-- Comments -->
                    <DockLayout dock="bottom" 
                        :style="{height: post.imagePost === '' ? '' : post.comments.length*151 + 'px'}"
                    >
                        <RadListView dock="top"  for="comment in post.comments"
                            ref="listview" swipeActions="true"
                            @itemSwipeProgressStarted="onSwipe"  
                            separatorColor="transparent">
                                <v-template>
                                    <Comment :comment="comment" />
                                </v-template>
                                <!-- Edit, Delete -->
                                <v-template name="itemswipe">
                                    <GridLayout columns="auto, *, auto" rows="auto" >
                                        <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column"
                                            @tap="onLeftClick" 
                                            background="green"
                                            id="edit-view" col="0" row="0" class="swipe-item left" >
                                            <Label text="Sửa" textAlignment="center" width="70" height="70" @tap="showModal" />
                                        </FlexboxLayout>
                                        <FlexboxLayout justifyContent="center" alignItems="center"
                                            @tap="onRightClick" 
                                            backgroundColor="red"
                                            id="delete-view" col="2" row="0" class="swipe-item right" >
                                            <Label text="Xóa" textAlignment="center" width="70" height="70" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                </v-template> 
                        </RadListView>
                    </DockLayout>
                </DockLayout>

            </ScrollView>
            <!--  -->
                
                <StackLayout dock="bottom" class="formComment">
                    <!-- list Likes -->
                    <StackLayout :hidden="hiddenLikes">
                        <GridLayout columns="auto, * , auto" rows="*" style="height: 120px;">
                            <Label :text="post.sumLike + ' người thích'" textWrap="true"
                                class="sumLike" col="0" row="0" />
                            <Image src="res://arrowdown" stretch="aspectFill" class="avatarUser fas"
                                col="2" row="0" @tap="hiddenlistLikes" />
                            
                        </GridLayout>

                        <ListView for="like in post.likes"
                            separatorColor="transparent" style="margin: 20px 30px;">
                            <v-template>
                                <StackLayout orientation="horizontal" @tap="goUserOther(like)">
                                    <!-- <Image :src="like.image" stretch="aspectFill" class="avatarUser" /> -->
                                    <ImageUser :image="like.image" :status="like.status" />
                                    <Label :text="like.uname" style="font-weight: bold; margin-left: 20px; margin-top: 20px;" />
                                </StackLayout>
                            </v-template>
                        </ListView> 
                    </StackLayout>
                    <!-- Form comment -->
                    <StackLayout :hidden="!hiddenLikes" orientation="horizontal">
                        <TextField hint="Nhập bình luận ..." width="85%"
                            v-model="textComment"
                            @focus="downHeightScroll" 
                            @blur="upHeightScroll" 
                            @returnPress="upHeightScroll" 
                        />
                        <Image src="res://send" @tap="sendComment" stretch="aspectFill" class="avatarUser" />
                    
                    </StackLayout>
                </StackLayout>   
        </DockLayout> 
    </Page>
</template> 

<script>
import { mapGetters } from 'vuex'
import methods from '../components-sources/post-postdetail';

import Comment from "../component-elements/Comment.vue"
import LikeCommentShare from "../component-elements/LikeCommentShare.vue"
import ImageUser from "../component-elements/ImageUser.vue"
import UserOther from "../components/UserOther.vue"
import DB from '../APIs';
export default {
    props: ["i"],
    components: {
        Comment, LikeCommentShare, ImageUser
    },
    computed: {
        ...mapGetters(["user", "posts"]),
    },
    data: () => ({
        post: {},
        textComment: "",
        heightScroll: '92%',
        hiddenLikes: true
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
        sendComment: methods.sendComment,
        downHeightScroll() {
            this.heightScroll = '60%'
        },
        upHeightScroll() {
            this.heightScroll = '92%'
        },
        hiddenlistLikes() {
            this.upHeightScroll()
            this.hiddenLikes = !this.hiddenLikes
        },
        showlistLikes() {
            this.downHeightScroll()
            this.hiddenLikes = !this.hiddenLikes
        },
        goUserOther(post) {
            this.$navigateTo(UserOther, { 
            props: {
                other: post
            }
            })
        },
        onSwipe ({ data, object }) {
          const swipelimit = data.swipeLimits
          const swipeview = object
          //show view
          const left = swipeview.getViewById("edit-view")
          const right = swipeview.getViewById("delete-view")
          // Nguong keo'
          swipelimit.left = left.getMeasuredWidth()
          swipelimit.right = right.getMeasuredWidth() 
          swipelimit.threshold = left.getMeasuredWidth()/2
        },
        onRightClick({ object }) {
            console.log(object.bindingContext);
            let cmt = object.bindingContext
            DB.load("comments").deleteWhere("cid", cmt.cid)
                .then((result) => {
                    this.post.comments = this.post.comments.filter(comt => comt.cid !== cmt.pid)
                }).catch((err) => {
                    
                });
        },
        onLeftClick({ object }) {
            console.log(object);
        }
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