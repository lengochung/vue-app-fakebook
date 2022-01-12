<template>
  <StackLayout>
    <TextView hint="Bạn đang nghĩ gì ..." v-model="textStatus" />
    
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

</style>