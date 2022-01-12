<style>
   .bg {
     background: url(res://background) no-repeat;
     background-size: 100% 100%;
   }
   .busy {
     color: black;
   }
   .alert {
     color: rgb(141, 3, 3); text-align: right;
   }
  
</style>
<template>
  <Page>
    <ActionBar title="" style="height: 0;">
    </ActionBar>
    <FlexboxLayout justifyContent="center" flexDirection="column"
      class="bg"
    >
    <!--  -->
      <StackLayout>
        <card-view elevation="20">
          <StackLayout>
            <Label text="sldkfjsldkfsdlkj" textWrap="true" />
            
          </StackLayout>
        </card-view>
      </StackLayout>

    <!--  -->

    
        <StackLayout orientation="" :hidden="hidden">
          
          <TextField hint="Tài khoản" 
            autocorrect="true"
            minLength="6" maxLength="12"
            v-model="inputText.user" />
          <Label :text="alert.user" v-if="alert.user.length > 0" class="alert" textWrap="true" />
          <!--  -->
          <TextField hint="Password" 
            autocorrect="true" secure="true" 
            v-model="inputText.password"
            returnKeyType="go" />
          <Label :text="alert.password" v-if="alert.password.length > 0" class="alert" textWrap="true" />
          <!--  -->
          <Button text="Go" @tap="loginHandle"
            :hidden="inputText.user.length > 0 && inputText.password.length > 0 ? false : true"
          />
          
        </StackLayout>
      <ActivityIndicator ref="load" width="100" height="100" class="busy" :busy="hidden" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapMutations } from 'vuex'

import methods from "./methods"

export default {
    data: () => ({
      hidden: false,
      inputText: {
        user: "max", password: "lengochung"
      },
      alert: {
        user: "", password: ""
      },
    }),
    methods: {
      ...mapMutations(["setLogin"]),
      loginHandle: methods.loginHandle
    },
    mounted() {
       
    }
}
</script>