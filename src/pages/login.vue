<style>
   .bg {
     background: url(res://background) no-repeat;
     background-size: 100% 100%;
   }
   .busy {
     color: #4BD5DC;
   }
   .alert {
     color: rgb(141, 3, 3); text-align: right;
   }

  
  .border-bottom {
    border-bottom-width: 1;
    border-bottom-color: #4BD5DC;
    margin-bottom: 20;
    padding-bottom: 8;
  }
  .form-input {
    color: rgb(3, 3, 3);
    placeholder-color: rgb(56, 56, 56);
  }
  .icon-margin {
    margin-right: 10;
  }
  .my-button {
    background-color: #4BD5DC;
    color: white;
    font-weight: bold;
    border-radius: 25;
    padding-top: 14;
    padding-bottom: 14;
    text-transform: uppercase;
    letter-spacing: 0.1;
    margin-bottom: 20;
    margin-top: 10;
  }
  .auth-buttons {
    color: rgb(22, 20, 20);
    font-size: 14;
  }
  .full-height {
    height: 100%;
  }
  .logo-container {
    width: 100;
    margin-bottom: 20;
  }
  .container {
    margin-left: 34;
    margin-right: 34;
  }
  
</style>
<template>
  <Page>
    <ActionBar title="" style="height: 0;">
    </ActionBar>
    <!--  -->
      <StackLayout direction="to right" class="bg">
        <FlexboxLayout flexDirection="column" justifyContent="center" class="full-height">
          <!-- <Image src="~/assets/images/NativeScript-Vue.png" class="logo-container "/> -->

          <StackLayout class="container" :hidden="hidden">
            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/user-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Username" class="form-input" 
                v-model="username"
              />
              <Label :text="alert.user" v-if="alert.user.length > 0" class="alert" textWrap="true" />
            </FlexboxLayout>

            <FlexboxLayout alignItems="center" class="border-bottom">
              <Image src="~/assets/images/password-icon.png" width="20" height="20" class="icon-margin" />
              <TextField  hint="Password" secure="true" class="form-input" 
                v-model="password" returnKeyType="go"
              />
              <Label :text="alert.password" v-if="alert.password.length > 0" class="alert" textWrap="true" />
            </FlexboxLayout>

            <Button text="Login"  class="my-button"
              @tap="loginHandle"
              
            />

            <FlexboxLayout alignItems="center" justifyContent="space-between" class="auth-buttons">
              <Label 
                @tap="gotoRegister"
                horizontalAlignment="left" text="Create Account" />
              <!-- <Label horizontalAlignment="right" text="Forgot Password" /> -->
            </FlexboxLayout>
          </StackLayout>
          <ActivityIndicator ref="load" width="100" height="100" class="busy" :busy="hidden" />

        </FlexboxLayout>

    </StackLayout>

    <!--  -->


  </Page>
</template>

<script>

import { mapMutations } from 'vuex'

import methods from "./methods"

import Register from "./register.vue"

export default {
    props: ['username', 'password'],
    data: () => ({
      hidden: false,
      alert: {
        user: "", password: ""
      },
    }),
    methods: {
      ...mapMutations(["setLogin"]),
      loginHandle: methods.loginHandle,
      gotoRegister() {
        this.$navigateTo(Register, {
                transition: {
                    name: "slideBottom", duration: 300, curve: "easeIn"
                }
            })
      }
    },
    mounted() {
       
    },
    created() {
        
    },
}
</script>
