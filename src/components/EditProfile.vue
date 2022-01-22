<template>
    <Page>
        <ActionBar title="Chỉnh sửa thông tin" icon="">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <StackLayout class="info">
            <StackLayout class="container">
                <Label text="Tài khoản" textWrap="true" class="title" />
                <Label text="Đổi mật khẩu" textWrap="true" class="column3"
                          @tap="changePassword(promptInit('',''))" />
                <StackLayout orientation="horizontal">
                    <Label text="Username" textWrap="true" class="column1" />
                    <Label :text="user.username" textWrap="true" class="column2" />
                    
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label text="Mật khẩu" textWrap="true" class="column1" />
                    <Label text="**********" textWrap="true" class="column2" />
                    
                </StackLayout>
                
            </StackLayout>
            <!-- Information Persional -->
            <StackLayout class="container">
                <Label text="Thông tin cá nhân" textWrap="true" class="title" />
                <Label text="Sửa thông tin" textWrap="true" class="column3"
                          @tap="changeInformation" />
                <StackLayout orientation="horizontal">
                    <Label text="Tên hiển thị" textWrap="true" class="column1" />
                    <Label :text="user.uname" textWrap="true" class="column2" />
                    
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label text="Biệt danh" textWrap="true" class="column1" />
                    <Label :text="user.nickname" textWrap="true" class="column2" />
                    
                    
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label text="Điện thoại" textWrap="true" class="column1" />
                    <Label :text="user.phone" textWrap="true" class="column2" />
                    
                </StackLayout>
                <StackLayout orientation="horizontal">
                    <Label text="Giới tính" textWrap="true" class="column1" />
                    <Label :text="user.gender" textWrap="true" class="column2" />
                    
                </StackLayout>
                
            </StackLayout>
            <!-- Ảnh -->
            <StackLayout class="container">
                <Label text="Ảnh đại diện" textWrap="true" class="title" />
                <Label v-if="!base64_code" text="Sửa ảnh" textWrap="true" class="column3"
                          @tap="changeImage" />
                <Label v-if="base64_code" text="Lưu" textWrap="true" class="column3"
                          @tap="saveImage" />
                <GridLayout rows="auto, *" columns="*">
                    
                     <ActivityIndicator v-if="saveImg"
                        row="0" col="0"
                        width="50"
                        height="50"
                        class="busy"
                        :busy="true"
                    />
                    
                    <Image :src="user.image" v-if="!saveImg" stretch="aspectFit"
                        row="1" col="0" /> 
                    
                </GridLayout>
                
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
import { Dialogs, ImageSource, inputType } from '@nativescript/core'
import { mapGetters, mapMutations } from 'vuex'
import DB from '../APIs'
import config from '../config'

var imagePicker = require("@nativescript/imagepicker")
export default {
    computed: {
        ...mapGetters(["user"])
    },
    data: () => ({
        base64_code: null,
        saveImg: false,
        promptInit: (msg, defaultText) => ({
            title: "Nhập mật khẩu cũ",
            message: msg,
            defaultText: defaultText,
            okButtonText: "OK",
            inputType: inputType.password,
            cancelButtonText: "Hủy",
        }),
        loginInit: (msg, username) => ({
            userName: username,
            userNameHint: "Nhập mật khẩu mới",
            password: "",
            passwordHint: "Xác nhận mật khẩu mới",
            title: "Mật khẩu mới",
            message: msg,
            okButtonText: "Hoàn tất",
            cancelButtonText: "Hủy",
        }),
        actionList: {
            "Tên hiển thị": ["uname", inputType.text, 2, 20],
            "Biệt danh": ["nickname", inputType.text, 5, 30],
            "Số điện thoại": ["phone", inputType.phone, 10, 11],
            "Giới tính": ["gender", inputType.text, 2, 5],
            "... Thôi": false
        },
        promptInfoInit: (msg, defaultText, inputType) => ({
            message: msg,
            defaultText: defaultText,
            okButtonText: "OK",
            inputType: inputType,
            cancelButtonText: "Hủy",
        })
          
    }),
    created() {
        
    },
    methods: {
         ...mapMutations(["setPassword", "setImage", "uname", "nickname", "phone", "gender"]),
        alertMessage: message => Dialogs.alert({ message }),
        confirmNewPassword(loginInit) {
            Dialogs.login(loginInit)
                .then((rs) => {
                    if(rs.result) {
                        if(rs.userName.length < 8 || rs.userName.length > 20) {
                            this.confirmNewPassword(this.loginInit("Vui lòng nhập 8-20 ký tự", rs.userName))
                        } else {
                            if(rs.userName == rs.password) {
                                DB.load("users").updateWhere("password", rs.password, "uid", this.user.uid)
                                    .then(rslt => {
                                        this.setPassword(rs.password)
                                        this.alertMessage("Cập nhật thành công mật khẩu")
                                    })
                                    .catch(err => this.alertMessage("Vui lòng kiểm tra kết nối") );
                            } else {
                                this.confirmNewPassword(this.loginInit("Xác nhận không trùng. Nhập lại", rs.userName))
                            }
                        }
                    }
                })
        },
        changePassword(promptInit) {
            Dialogs.prompt(promptInit)
                .then((prompt) => {
                    if(prompt.result) {
                        if( prompt.text == this.user.password ) {
                            this.confirmNewPassword(this.loginInit("", ""))
                        } else {
                            this.changePassword(this.promptInit("Nhập sai mật khẩu", prompt.text))
                        }
                    }
                })
        },
        changeImage() {
            const context = imagePicker.create({ mode: "single" });
            context
                .authorize()
                .then(() => context.present())
                .then((selection) => {
                    ImageSource.fromAsset(selection[0]).then((imgSrc) => {
                        this.user.image = selection[0].android;
                        this.base64_code = imgSrc.resize(200).toBase64String("png" | "jpg" | "jpeg"); //Save tmp file
                    });
                });
        },
        saveImage() {
            this.saveImg = true
            // 
            let filename = Math.floor(Math.random() * 100000 + 10000);
            let formData = new FormData();
            formData.append("filename", filename);
            formData.append("file", this.base64_code);
            // Upload image first then update image user
            fetch(config.PATH_API_UPLOAD_IMG, {
                method: "POST",
                body: formData,
            })
                .then(rs => rs.json())
                .then(rs => {
                    // Update image user when upload done
                    DB.load("users")
                        .updateWhere("image", filename + ".png", "uid", this.user.uid)
                        .then((rs) => {
                            this.saveImg = false
                            this.setImage(this.user.image)
                            this.alertMessage("Cập nhật ảnh đại diện thành công")
                        }).catch((err) => {
                            this.alertMessage("Kiểm tra kêt nối Wifi")
                        });
                })
                .catch(err => this.alertMessage("Kiểm tra kêt nối Wifi"));
        },
        promptInfo(promptInitInfo, field) {
            Dialogs.prompt(promptInitInfo)
                .then(rs => {
                    if(rs.result) {
                        if(rs.text.length >= field[2] && rs.text.length <= field[3]) {
                            DB.load("users").updateWhere(field[0], rs.text, "uid", this.user.uid)
                                .then((result) => {
                                    this[field[0]](rs.text)
                                    this.alertMessage("Cập nhật thành công")
                                }).catch((err) => {
                                    this.alertMessage("Kiểm tra kêt nối Wifi")
                                });
                        } else {
                            this.promptInfo(
                                this.promptInfoInit("Thông tin này cần " + field[2] + "-" + field[3] + " ký tự", rs.text, field[1]),
                                field
                            )
                        }
                    }
                })
        },
        changeInformation() {
            Dialogs.action({
                title: "Chọn thông tin muốn thay đổi",
                cancelButtonText: "... Thôi",
                actions: ["Tên hiển thị", "Biệt danh", "Số điện thoại", "Giới tính"]
            }).then((rs) => {
                let field = this.actionList[rs]
                if(field) {
                    this.promptInfo(
                        this.promptInfoInit(rs, this.user[field[0]], field[1]),
                        field
                    )
                }
            })
        }
    },
}
</script>

<style>
    .info {
        margin-top: 30px;
    }
    .info .container {
        background: rgb(241, 242, 243);
        border-radius: 50px;
        margin: 20px 20px;
        padding: 30px;
    }
    .info .container .title {
        font-size: 17px; font-weight: bold;
        
    }
    .info .container .column1 {
        width: 30%;
        
    }
    .info .container .column2 {
        
        
    }
    .info .container .column3 {
        text-align: right; float: right; margin-right: 0;
        color: green;
    }
</style>