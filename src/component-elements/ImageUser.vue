<template>
  <AbsoluteLayout>
    <Image :src="image" top="0" left="0"
        stretch="aspectFill" class="avatarUser" />
    <Label v-if="status==='1'" top="28" left="26" id="statusLog" />
  </AbsoluteLayout>
</template>

<script>
export default {
    props: ["image", "status"]
}
</script>

<style>
    #statusLog {
        width: 30px; height: 30px; background: green;
        border-radius: 360px;
    }
</style>