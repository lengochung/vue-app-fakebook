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
  
    <GridLayout class="bghome">
        <!-- Form Post -->
        <FormPost />
        <!--  -->
        <ScrollView>
            <ListView class="posts" for="post in posts" @itemTap="tapPost">
                <v-template>
                    <Post  :post="post" :user="user" />
                </v-template>
            </ListView>
        </ScrollView>
    </GridLayout>

   
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Post from "../component-elements/Post.vue"
import PostDetail from "./PostDetail.vue"
import FormPost from "../component-elements/FormPost.vue"

export default {
    components: {
        Post, FormPost
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
        }
    },
    data: () => ({

    }),
    mounted() { 
 
    }
}
</script>