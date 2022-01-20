<template>
  <Page>
      
      <Login />
      <!-- <Login v-if="!logged" /> -->
  </Page> 
</template>

<script>
import { LocalNotifications } from "nativescript-local-notifications";

import { mapGetters, mapMutations } from 'vuex'
import Login from "../pages/login.vue"
import { Dialogs } from '@nativescript/core';
import { loginFromResponseNofPost } from "../notifications/on-handle-nof-not-run"

export default {
    components: {
        Login
    },
    computed: {
        // ...mapGetters(["logged"])
        // ...mapMutations(["setLogin"])
    },
    data: () => ({
        
    }),
    created() {
        setInterval(() => {
            console.log("Realtiming .........................");
            this.$store.dispatch("getPosts")
        }, 5000);
        LocalNotifications.addOnMessageReceivedCallback(data => {
            loginFromResponseNofPost({
                uid: "501200018",
                uname: "Le Ngoc Hung",
                image: "hung.png",
                gender: "Nam", 
                phone: '0987',
            }, this)
        });
        
    },
}
</script>

<style>
    ActionBar {
        background-color: white;
        color: #161616;
    }
    .hiddenActionBar {
        height: 0;
    }
</style>