<template>
  <Page>
      
      <Login />
      <!-- <Login v-if="!logged" /> -->
  </Page> 
</template>

<script>
import { mapGetters } from 'vuex'
import Login from "../pages/login.vue"

export default {
    components: {
        Login
    },
    computed: {
        // ...mapGetters(["logged"])
    },
    data: () => ({
         
    })
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