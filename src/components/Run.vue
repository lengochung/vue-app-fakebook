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
        background-color: rgb(9, 138, 95);
        color: #ffffff;
    }
    .hiddenActionBar {
        height: 0;
    }
</style>