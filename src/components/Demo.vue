<template>
    <Page>
        <ActionBar title="dlskfh" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack" />
          <ActionItem icon="" text="Left" android.systemIcon="ic_menu_camera" ios.position="left" @tap="" />
          <ActionItem icon="" text="Right" android.systemIcon="ic_menu_search" ios.position="right" @tap="" />
        </ActionBar>
        <StackLayout>
           
            <FlexboxLayout flexDirection="column-reverse" 
                class="containerChat" @tap="blurTextField">
                <!-- Seen -->
                <GridLayout
                     rows="*" columns="*, auto" style="height: 20em;">
                    <Image src="~/assets/images/hung.png" row="0" col="1"
                         class="iconSeen" stretch="aspectFill" /> 
                </GridLayout>
                <!-- Messages -->
                <ListView for="item in messages" separatorColor="transparent">
                    <v-template>
                        <StackLayout > 
                            <!-- recieve -->
                            <GridLayout v-if="item.type === 'recieve'"
                                rows="*" columns="auto, auto, auto">
                                <Image :src="item.image" 
                                    @tap="onItemTap" 
                                    row="0" col="0" class="iconChat" stretch="aspectFill" />
                                <Label v-if="item.photo==''" row="0" col="1" class="messageLeft"
                                    :text="item.message" textWrap="true" />
                                <Image v-if="item.message==''" class="photoChatLeft" row="0" col="1"
                                    :src="item.photo" stretch="aspectFill" />
                                
                                <Label row="0" col="2" width="100"
                                    text="" textWrap="true" />
                        
                            </GridLayout>   
                            <!-- send -->
                            <GridLayout v-if="item.type === 'send'"
                                rows="*" columns="*, auto">
                                <Label row="0" col="0" width="150"
                                    text="" textWrap="true" />
                                <Label row="0" col="1" class="messageRight"
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
        // setInterval(() => {
            this.$store.dispatch("getMessages")
        // }, 1000);
        
    },
    data: () => ({
        arr: [
            {
                a: "HUNG"
            }
        ]
    }),
    computed: {
        ...mapGetters(["messages"])
    },
    methods: {
        onItemTap() {
            console.log(this.messages);
        },
        blurTextField() {
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
    .iconChat {
        border-radius: 360px;
        width: 30em; height: 30em;
    }
    .photoChatLeft {
        margin-left: 10em; margin-bottom: 5em;
        width: 100em;
        border-radius: 30px;
    }
    .iconSeen {
        border-radius: 360px;
        width: 20em; height: 20em;
        margin-right: 10em;
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
    .messageLeft {
        padding: 10em; margin-left: 10em; margin-bottom: 5em;
        background: rgb(74, 247, 74);
        border-radius: 30px; font-size: 16px;
    }
    .messageRight {
        padding: 10em; margin-right: 10em; margin-bottom: 5em;
        background: rgb(233, 235, 233);
        border-radius: 15px; font-size: 16px;
    }
</style>