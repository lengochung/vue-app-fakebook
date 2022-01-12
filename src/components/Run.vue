<template>
  <Page>
      
      <Login />
  </Page> 
</template>

<script>
import Login from "../pages/login.vue"

export default {
    components: {
        Login
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