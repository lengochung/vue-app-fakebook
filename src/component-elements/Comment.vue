<template>
    <AbsoluteLayout>
        <Image :src="comment.image"
            stretch="aspectFill" class="avatarUser"
            top="0" left="20" />
        <StackLayout top="0" left="80" width="300">
            <Label :text="comment.uname" textWrap="true" style="font-weight: bold; color: black;" />
            <Label :text="comment.comment" textWrap="true" style="color: black; marign-right: 20px;" />
            <Label :text="comment.time" textWrap="true" style="font-size: 12px;" />
        </StackLayout>

    </AbsoluteLayout>
</template>

<script>
export default {
    props: ["comment"],
}
</script>

<style>
    
</style>