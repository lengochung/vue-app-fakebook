<template>
    <Page>
        <ActionBar title="Nhắn tin" icon="">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <ActionItem icon="" text="Left" ios.position="left" @tap="" />
            <ActionItem icon="" text="Right" ios.position="right" @tap="" />
        </ActionBar>
         <ScrollView scrollBarIndicatorVisible="true">
            <Button text="CLikc me" @tap="tap" />
            
               
            <!-- <RadListView
                class="posts" for="msg in messages" @itemTap="tapPost">
                <v-template>
                    <Label :text="msg.message" textWrap="true" />
                    
                </v-template> 
            </RadListView>  -->
               
               
           
            
        </ScrollView>
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["messages", "listChat"])
    },
    methods: {
        tap() {
            console.log(this.listChat);
        }
    },
}
</script>

<style>

</style>