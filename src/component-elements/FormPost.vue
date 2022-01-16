<template>
  <StackLayout class="formpost">
    <TextField hint="Bạn đang nghĩ gì ..." v-model="textStatus" />
    <Image src="res://icon" stretch="none" />
    
  </StackLayout>
</template>

<script>
export default {
    data: () => ({
        textStatus: ""
    }),
}
</script>

<style>
  .formpost {
    height: 200px;
  }
</style>