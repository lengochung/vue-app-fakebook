<style>
    .posts {
       
    }
    .posts .post {
        padding: 30px 30px;
        background: rgb(252, 250, 250);
        color: black;
    }
    .bghome {
        background: rgb(61, 61, 61);
    }
</style>

<template>
  
   
        <ScrollView scrollBarIndicatorVisible="true">
            <!-- <DockLayout stretchLastChild="true"> -->
                <ScrollView >
                     <ListView
                        class="posts" for="post in posts" @itemTap="tapPost">
                        <v-template>
                            <Post  :post="post" :user="user" />
                        </v-template> 
                    </ListView> 
                </ScrollView>
               
            <!-- </DockLayout> -->
            
        </ScrollView>

   
</template> 

<script>
import { LocalNotifications } from 'nativescript-local-notifications'
import { loginFromResponseNofPost } from "../notifications/on-handle-nof-not-run"
import { mapGetters, mapMutations } from 'vuex'

import Post from "../component-elements/Post.vue"
import PostDetail from "./PostDetail.vue"

export default {
    components: {
        Post
    },
    computed: {
        ...mapGetters(["posts", "user"]),
    },
    methods: {
        tapPost({item, index}) {
            this.$navigateTo(PostDetail, { 
                props: { i: index },
                transition: {
                    name: "slideLeft", duration: 300, curve: "easeIn" 
                }
            })
        },
    },
    data: () => ({

    }),
    mounted() { 
        // setInterval(() => {
        //   this.$store.dispatch("getPosts")
        // }, 3000); 
    },
    created() {
        LocalNotifications.addOnMessageReceivedCallback(data => {
            loginFromResponseNofPost({
                uid: "501200018",
                uname: "Le Ngoc Hung",
                image: "hung.png",
                gender: "Nam", 
                phone: '0987',
            }, this)
        });
    },
}
</script>