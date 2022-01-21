<template>
  
        <ScrollView>
            <StackLayout>
                <AbsoluteLayout id="otheravatar" >
                    <Image top="50" left="" id="avatar"
                        :src="user.image" stretch="aspectFill" />
                    <Label v-if="user.status==='1'" top="185" left="120" 
                        textWrap="true" id="status" />
                    
                </AbsoluteLayout>
                <StackLayout style="margin: 30px 0;">
                    <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column">
                        <Label :text="user.uname" textWrap="true" id="othername" />
                        <Label v-if="user.nickname!==''"
                            :text="user.nickname" textWrap="true" id="nickname" />
                    </FlexboxLayout>    
                </StackLayout>
                <StackLayout>
                    <FlexboxLayout justifyContent="space-around" alignItems="center" flexDirection="row">
                        <Button text="Ảnh" @tap="tap" /> >
                        <Button text="Nhắn tin" @tap="" />  
                    </FlexboxLayout>
                </StackLayout>
                <StackLayout>
                    <Label class="line" textWrap="true" />
                </StackLayout>
                <StackLayout>
                    <Label style="margin-left: 30px; margin-bottom: 50px;"
                         text="Thông tin cá nhân" id="title" textWrap="true" />
                </StackLayout>
                <StackLayout id="infomation">
                    <StackLayout orientation="horizontal">
                        <Image src="res://phone" stretch="aspectFill" class="icon" />
                        <Label :text="user.phone" textWrap="true" class="phone" />   
                    </StackLayout>
                    <StackLayout orientation="horizontal">
                        <Image src="res://gender" stretch="aspectFill" class="icon" />
                        <Label :text="user.gender" textWrap="true" class="phone" />   
                    </StackLayout>
                </StackLayout>
                <StackLayout>
                    <Label class="line" textWrap="true" />
                </StackLayout>
                <StackLayout>
                    <Label style="margin-left: 30px; margin-bottom: 50px;"
                         text="Bài viết" id="title" textWrap="true" />
                </StackLayout>
                <StackLayout style="margin: 20px 30px;"
                    v-for="post in list" :key="post.pid">
                        <PostUser :post="post" :user="user" :pid="post.pid" />
                        <Label class="line" style="height: 5px;" textWrap="true" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
   
  
</template>

<script>
import { mapGetters } from 'vuex'
import PostUser from "../component-elements/PostUser.vue"
import PostDetail from "../components/PostDetail.vue"
export default {
    props: ["user"],
    components: {
        PostUser,
    },
    computed: {
        ...mapGetters(["posts"]),
        list() {
            return this.posts.filter(post => post.uid === this.user.uid)
        }
    },
    data: () => ({
         
    }),
    mounted() {
    },
    methods: {
        tapPost(item, index) {
            this.$navigateTo(PostDetail, { 
                props: { pid: item.pid },
                transition: {
                    name: "slideLeft", duration: 300, curve: "easeIn" 
                }
            })
        },
    },
}
</script>

<style>
    #title {
        font-weight: bold; font-size: 18px;
    }
    #othername {
        font-weight: bold; font-size: 23px;
    }
    #nickname {
         font-size: 19px;
    }
    #otheravatar {
        width: 450px; height: 600px; margin: auto;
    }
    #otheravatar #avatar {
        border-radius: 360px; width: 450px; height: 450px;
    }
    #otheravatar #status {
        border-radius: 360px; width: 60px; height: 60px;
        background: green;
    }
    #otheravatar #background {
        width: 20%; height: 600px;
        background: rgb(59, 63, 59);
    }
    #btnphoto {
        width: 50px; height: 50px; background: url(~/assets/images/hung.png);
    }
    #infomation {
        width: 90%; margin: auto;
    }
    #infomation .icon {
        width: 100px; height: 100px; margin-right: 30px;
    }
    #infomation .phone {
        margin-top: 30px; font-size: 16px;
    }
</style> 