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
            <!-- Teeen -->
            <StackLayout class="container">
                <Label text="Thông tin cá nhân" textWrap="true" class="title" />
                <Label text="Sửa thông tin" textWrap="true" class="column3"
                          @tap="changeInfomation" />
                <StackLayout orientation="horizontal">
                    <Label text="Tên" textWrap="true" class="column1" />
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
                <Label text="Sửa ảnh" textWrap="true" class="column3"
                          @tap="changeImage" />
                <GridLayout rows="auto, *" columns="*">
                    
                    <Label v-if="!editImg" text="Sửa" row="0" col="0" 
                        textAlignment="right" textWrap="true" />
                    
                    <Image :src="user.image" stretch="aspectFit"
                        row="1" col="0" />
                    
                </GridLayout>
                
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
import { Dialogs, inputType } from '@nativescript/core'
import { mapGetters, mapMutations } from 'vuex'
import DB from '../APIs'
export default {
    computed: {
        ...mapGetters(["user"]),
        ...mapMutations(["setPassword"])
    },
    data: () => ({
        editImg: true,
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
        })
    }),
    created() {

    },
    methods: {
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
                                        Dialogs.alert("Cập nhật thành công mật khẩu")
                                    })
                                    .catch(err => Dialogs.alert("Vui lòng kiểm tra kết nối"))
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
        }
    },
}
</script>

<style>
    .info {
        margin-top: 30px;
    }
    .info .container {
        background: rgb(193, 215, 245);
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