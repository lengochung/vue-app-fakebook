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
.e {
    width: 80px; height: 80px; border-radius: 360px;
}
    ActionBar {
        background-color: rgb(9, 138, 95);
        color: #ffffff;
    }
</style>