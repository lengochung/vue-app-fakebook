<template>
    <Page>
        <ActionBar title="Title" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack" />
          <ActionItem icon="" text="Left" android.systemIcon="ic_menu_camera" ios.position="left" @tap="" />
          <ActionItem icon="" text="Right" android.systemIcon="ic_menu_search" ios.position="right" @tap="" />
        </ActionBar>
        <StackLayout>
           
            <FlexboxLayout flexDirection="column-reverse" 
                class="containerChat" @tap="downTextField">
                <!-- Seen -->
                <GridLayout rows="*" columns="*, auto" style="height: 25em;">
                    <Image src="res://send" @tap="onItemTap" row="0" col="1"
                         class="iconMessenger" stretch="aspectFit" />
                </GridLayout>
                <!-- Messages -->
                <ListView for="item in messages" @itemTap="onItemTap">
                    <v-template>
                        <StackLayout>
                            <!-- recieve -->
                            <GridLayout v-if="item.type === 'recieve'"
                                rows="*" columns="auto, *, auto">
                                <Image src="res://send" @tap="onItemTap"
                                    row="0" col="0" class="iconMessenger" stretch="aspectFit" />
                                <Label row="0" col="1" 
                                    :text="item.message" textWrap="true" />
                                <Label row="0" col="2" width="100"
                                    text="" textWrap="true" />
                            
                            </GridLayout>   
                            <!-- send -->
                            <GridLayout v-if="item.type === 'send'"
                                rows="*" columns="*, auto"> 
                                <Label row="0" col="0" width="150"
                                    text="" textWrap="true" />
                                <Label row="0" col="1" 
                                    :text="item.message" textWrap="true" />
                                
                                
                            </GridLayout>
                        </StackLayout>
                    </v-template>
                </ListView>
                
            </FlexboxLayout>


            <FlexboxLayout justifyContent="center" flexDirection="column"
                class="reply"
            >
                <GridLayout rows="*" columns="auto, *, auto">
                    
                    <Image src="res://uploadimg" class="iconMessenger" row="0" col="0" stretch="aspectFit" />
                    
                    <TextField row="0" col="1"
                        ref="text" hint="Viết tin nhắn" text="" />
                    <Image src="res://send" @tap="onItemTap"
                         class="iconMessenger"   row="0" col="2" stretch="aspectFit" />
                </GridLayout>
                
                
            </FlexboxLayout>
            
        </StackLayout>
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    created() {
        this.$store.dispatch("getMessages")
    },
    data: () => ({
        
    }),
    computed: {
        ...mapGetters(["messages"])
    },
    methods: {
        onItemTap() {
            console.log(this.messages);
        },
        downTextField() {
            this.$refs.text.nativeView.isEnabled = false
            this.$refs.text.nativeView.isEnabled = true
        }
    },
}
</script>

<style>
    ActionBar {
        color: black;
        
    }
    .iconMessenger {
        border-radius: 360px;
        width: 35em; height: 35em;
    }
    .reply {
        padding: 0 5em;
        background: rgb(151, 149, 149);
        /* color: white; */
    }
    .containerChat {
        height: 92%;
        padding: 10em 10em;
    }
</style>