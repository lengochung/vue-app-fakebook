<style>
    Actionbar .nameUser {
        margin-top: 15px;
        font-size: 18px; font-weight: bold;
    }
    ActionBar .back {
        width: 100px; height: 100px;
    }
</style>

<template>
    <Page>
        <ActionBar>
            <GridLayout columns="*, *, auto, *, *, *, *" >
                <Image src="res://back" stretch="aspectFill" class="back"
                    row="0" column="0" @tap="back"  /> 
                <Image :src="'~/assets/images/' + post.image"
                    stretch="aspectFill" class="avatarUser"
                    row="0" column="1" />
                <Label :text="post.uname" textWrap="true" class="nameUser"
                    row="0" column="2"  /> 
            </GridLayout>
        </ActionBar>
        <StackLayout>
          <Label :text="post.content" textWrap="true" />
          
        </StackLayout>
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'

import ActionChild from "../component-elements/ActionBar.vue"
export default {
    props: ["post"],
    components: {
        ActionChild
    },
    computed: {
        ...mapGetters(["user", "posts"])
    },
    methods: {
        back() {
            console.log(this.posts);
            this.$navigateBack({
                    transition: {
                        name: "slideRight", duration: 300, curve: "easeIn" 
                }
            })
        }
    },
}
</script>