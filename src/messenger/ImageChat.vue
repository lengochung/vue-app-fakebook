<template>
  <AbsoluteLayout>
    <Image :src="image" top="0" left="0"
        stretch="aspectFill" class="imageChat" />
    <Label v-if="status==='1'" top="45" left="45" class="statusLog" />
  </AbsoluteLayout>
</template>

<script>
export default {
    props: ["image", "status"]
}
</script>

<style>
    .statusLog {
        width: 15em; height: 15em; background: green;
        border-radius: 360px;
    }
    .imageChat {
        width: 60em; height: 60em;
        border-radius: 360px;
    }
</style>