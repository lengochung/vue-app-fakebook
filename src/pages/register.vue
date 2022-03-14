<style>
    .back {
        padding: 10;
        font-size: 18px;
    }
  
</style>
<template>
  <Page>
    <ActionBar title="Register" style="height: 0;"> 
    </ActionBar>
    <!--  -->
      <StackLayout direction="to right" class="bg">
          <FlexboxLayout alignItems="center" justifyContent="space-between" class="back">
              <Label @tap="$navigateBack"
                horizontalAlignment="left" text="Go back" />
              <!-- <Label horizontalAlignment="right" text="Forgot Password" /> -->
            </FlexboxLayout>
        <FlexboxLayout flexDirection="column" justifyContent="center" class="full-height">
          <!-- <Image src="~/assets/images/NativeScript-Vue.png" class="logo-container "/> -->

          <StackLayout class="container" :hidden='hidden'>
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/user-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Fullname" class="form-input" 
                    v-model="text.name"
              />
              <Label v-if="alert.name.length > 0" :text="alert.name"  class="alert" textWrap="true" />
            </FlexboxLayout>
<!--  -->
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/user-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Username" class="form-input" 
                    v-model="text.username"
              />
              <Label v-if="alert.username.length > 0" :text="alert.username"  class="alert" textWrap="true" />
            </FlexboxLayout>
<!--  -->
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/password-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Password" secure="true" class="form-input" 
                 returnKeyType="go" v-model="text.password"
              />
              <Label v-if="alert.password.length > 0" :text="alert.password"
                class="alert" textWrap="true" />
            </FlexboxLayout>
<!--  -->
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/confirm-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Password confirm" secure="true" class="form-input" 
                 returnKeyType="go" v-model="text.confirm"
              />
              <Label v-if="alert.confirm.length > 0" :text="alert.confirm"
                class="alert" textWrap="true" />
            </FlexboxLayout>

            <Button text="Register"  class="my-button" 
                @tap="handleRegister"
            />

          </StackLayout>
          <ActivityIndicator ref="load" width="100" height="100" class="busy" :busy="hidden" />

        </FlexboxLayout>

    </StackLayout>

    <!--  -->


  </Page>
</template>

<script>
import Login from './login.vue'
import { mapGetters } from 'vuex';
import DB from '../APIs';
import { Dialogs } from '@nativescript/core';
export default {
    data: () => ({
        hidden: false,
        text: {
            username: "",
            name: "",
            password: "",
            confirm: ""
        },
        alert: {
            username: "",
            name: "",
            password: "",
            confirm: ""
        }
    }),
    computed: {
        ...mapGetters(['users'])
    },
    methods: {
        handleRegister() {
            this.hidden = true;
            let username = this.text.username.toLowerCase()
            let name = this.text.name
            let password = this.text.password.toLowerCase()
            let confirm = this.text.confirm.toLowerCase()
            // handle
            DB.load('users').getAll().then(rs => {

                this.alert = {
                    username: "", name: "", password: "", confirm: ""
                }
                // 
                if(name.length < 6) {
                    this.alert.name = 'Độ dài 6 ký tự trở lên'
                    return Promise.reject()
                }

                if(username.length < 3) {
                    this.alert.username = 'Độ dài 3 ký tự trở lên'
                    return Promise.reject()
                }
                
                if(this.length < 6) {
                    this.alert.password = 'Độ dài 6 ký tự trở lên'
                    return Promise.reject()
                }

                if(rs.result.some(user => user.username == username)) {
                    this.alert.username = 'Username đã được sử dụng'
                    return Promise.reject()
                }

                if(password != confirm) {
                    this.alert.confirm = "Xác nhận không đúng"
                    return Promise.reject()
                }

                DB.load('users').insert(name, username, password)
                .then(rs => {
                    this.createTable(username, password, name)
                })

                
            }).catch(err => {
                this.hidden = false
            });

        },
        createTable(username, password, name) {
            return DB.messenger(username).create()
                .then(rs => {
                    if(rs.status == true) {
                        // Create table success
                        Dialogs.alert({
                            message: `Xin chào ${name} đến với Fakebook. Chúng tôi sẽ chuyển đến trang đăng nhập cho bạn.`
                        }).then(rs => {
                            
                            this.$navigateTo(Login, {
                                props: {
                                    username: username,
                                    password: password
                                },
                                transition: {
                                    name: "slideBottom", duration: 300, curve: "easeIn"
                                }
                            })
                        })
                    } else {
                        this.createTable(username)
                    }
                })
        }
    },
    mounted() {
        console.log(this.users);
    },
}
</script>