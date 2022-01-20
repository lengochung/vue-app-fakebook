<template>

    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!" android:flat="true"/>
        <StackLayout android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
                <Button text="Tap me" @tap="tap" />
                
            
        </StackLayout>
    </Page>
</template>

<script >
import { action, Dialogs } from '@nativescript/core'
// import { RadListView } from 'nativescript-ui-listview'

  export default {
    // component: {
    //   RadListView
    // },
    computed: {
        list () {
          let out = []
          out = this.foods.filter(item => item.group == this.group)
          return out
        }
    },
    methods: {
        tap() {
            Dialogs.login({
              title: "Login", 
              cancelButtonText: "Cancel", 
              okButtonText: "Go", 
              message: "<b>Login</b>",
              userName: "",
              userNameHint: "Enter you username",
              password: ""
            })
              .then((result) => {
                console.log(result);
              })
        }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: grey;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: right;
        font-size: 20;
        color: #333333;
    }
    .red{
       vertical-align: center;
        text-align: left;
        font-size: 20;
        color: #333333;
        background: green;
    }
</style>