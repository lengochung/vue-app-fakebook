<template>
    <AbsoluteLayout background="white" >
        <ImageUser @tap="goUserOther(comment)" :image="comment.image" 
            :status="comment.status" top="0" left="20" />
        <StackLayout top="0" left="80" width="300">
            <Label @tap="goUserOther(comment)"
                :text="comment.uname" textWrap="true" style="font-weight: bold; color: black;" />
            <Label :text="comment.comment" textWrap="true" style="color: black;" />
            <Label :text="comment.time" textWrap="true" style="font-size: 12px;" textAlignment="right" />
        </StackLayout>

    </AbsoluteLayout>
</template>

<script>
import UserOther from "../components/UserOther.vue"
import ImageUser from "./ImageUser.vue"
export default {
    props: ["comment"],
    components: {
        ImageUser
    },
    methods: {
        goUserOther(post) {
            this.$navigateTo(UserOther, { 
                props: {
                    other: post
                }
            })
        }
    },
}
</script>

<style>
    
</style>