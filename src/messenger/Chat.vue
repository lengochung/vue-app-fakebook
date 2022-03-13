<template>
    <Page>
        <ActionBar :title="userItem.uname" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack" />
          <ActionItem icon="" 
            @tap="onItemTap"
            text="Left" android.systemIcon="ic_menu_camera" ios.position="left" />
          <ActionItem icon="" text="Right" android.systemIcon="ic_menu_search" ios.position="right" @tap="" />
        </ActionBar>
        <StackLayout>
           
            <FlexboxLayout flexDirection="column-reverse"
                class="containerChat" @tap="blurTextField">
                <!-- Seen -->
                <!-- <GridLayout
                     rows="*" columns="*, auto" style="height: 20em;">
                    <Image src="~/assets/images/hung.png" row="0" col="1"
                         class="iconSeen" stretch="aspectFill" /> 
                </GridLayout> -->
                <!-- Messages -->
                <ListView for="item in list" separatorColor="transparent"> 
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
                                <Label v-if="item.photo==''" row="0" col="1" class="messageRight"
                                    :text="item.message" textWrap="true" />
                                <Image v-if="item.message==''" class="photoChatRight" row="0" col="1"
                                    :src="item.photo" stretch="aspectFill" />
                                
                                
                            </GridLayout>
                        </StackLayout>
                    </v-template>
                </ListView>
                
            </FlexboxLayout>

<!-- REply text field -->
            <FlexboxLayout justifyContent="center" flexDirection="column"
                class="reply" 
            >
                <GridLayout rows="*" columns="auto, *, auto">
                    
                    <Image @tap="onloadImage"
                        src="res://uploadimg" class="iconMessenger" row="0" col="0" stretch="aspectFit" />
                    
                    <TextField row="0" col="1"
                        v-model="textMessage"
                        ref="text" :hint="hint" text="" />
                    <Image src="res://send" @tap="send"
                         class="iconMessenger"   row="0" col="2" stretch="aspectFit" />
                </GridLayout>
                
                
            </FlexboxLayout>
            
        </StackLayout>
    </Page>
</template>

<script>
import { ImageSource } from '@nativescript/core'
var imagePicker = require("@nativescript/imagepicker")

import { mapGetters } from 'vuex'
import DB from '../APIs'
import helper from "../helpers"
import config from '../config'

export default {
     
    props: ["userItem"],
    data: () => ({
        textMessage: "",
        photo: "",
        base64_code: "",
        hint: "Viết tin nhắn ..."
    }),
    computed: {
        ...mapGetters(["messages", 'user']),
        list() {
            let arr = this.messages.filter(msg => msg.uid == this.userItem.uid)
            return helper.messenger.formatHiddenImage(arr).reverse()
        }
    },
    mounted() {
        this.seen = setInterval(() => {
                DB.messenger(this.user.username).seen(this.userItem.uid)
            }, 3000);
    },
    methods: {
        
        blurTextField() {
            this.$refs.text.nativeView.isEnabled = false
            this.$refs.text.nativeView.isEnabled = true
        },
        goBack() {
            clearInterval(this.seen)
            this.$navigateBack()
        },
        sendText() {
            this.$refs.text.nativeView.isEnabled = false
            
            DB.messenger(this.user.username)
                .insert(this.userItem, this.textMessage, this.photo + '.png', 'send') 
                .then(rs => {
                    DB.messenger(this.userItem.username)
                        .insert(this.user, this.textMessage, this.photo + '.png', 'recieve')
                        .then(rs => {
                            this.$refs.text.nativeView.isEnabled = true
                            this.textMessage = this.photo = ""
                            this.hint = "Viết tin nhắn ..."
                        })
                })
        },
        onloadImage() {
            const context = imagePicker.create({ mode: "single" });
            context
                .authorize()
                .then(() => context.present())
                .then((selection) => {
                    ImageSource.fromAsset(selection[0]).then(imgSrc => {
                        // this.user.image = selection[0].android;
                        this.base64_code = imgSrc.resize(200).toBase64String("png" | "jpg" | "jpeg"); //Save tmp file
                        this.textMessage = ""
                        this.hint = "Ảnh đã chuẩn bị"
                        this.photo = Math.floor(Math.random() * 100000 + 10000);
                    });
                });
        },
        saveImage() {
            // 
            let formData = new FormData();
            formData.append("filename", this.photo);
            formData.append("file", this.base64_code);
            // Upload image first then update image user
            fetch(config.PATH_API_UPLOAD_IMG, {
                method: "POST",
                body: formData,
            })
                .then(rs => rs.json())
                .then(rs => {
                    this.sendText()
                })
                .catch(err => this.alertMessage("Kiểm tra kêt nối Wifi"));
        },
        send() {
            if(this.textMessage !== "")
                this.sendText()
            else if(this.photo !== "")
                this.saveImage()
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
    .photoChatRight {
        margin-right: 10em; margin-bottom: 5em;
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
        height: 90%; 
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