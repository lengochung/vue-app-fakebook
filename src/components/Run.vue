<template>
  <Page>
      
      <Login />
      <!-- <Login v-if="!logged" /> -->
  </Page> 
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import Login from "../pages/login.vue"
import { Dialogs } from '@nativescript/core';
import DB from '../APIs';

export default {
    components: {
        Login
    },
    computed: {
        
    },
    data: () => ({
         
    }),
    created() {
       
        
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