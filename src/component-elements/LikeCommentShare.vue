<template>
   <GridLayout dock="top" columns="*, *, *" style="padding: 30px 0;">
            <!-- Like -->
            <GridLayout col="0"  columns="*,auto, *" @tap="likeHandle">
                <Image src="res://like2" row="0" column="0" class="postIcon" stretch="aspectFill" />
                <Label text="Thích" row="0" col="1" textWrap="true" class="postlcs"
                    :style="{ color: likeBoolean ? 'blue' : 'black' }" />
            </GridLayout>
            <!-- Comment -->
            <GridLayout col="1"  columns="*, auto, *">
                <Image src="res://comment" row="0" column="0" class="postIcon" stretch="aspectFill" />
                <Label text="Bình luận" row="0" col="1" textWrap="true" class="postlcs" />
            </GridLayout>
            <!-- Share -->
            <GridLayout col="2"  columns="*, auto, *">
                <Image src="res://share" row="0" column="0" class="postIcon" stretch="aspectFill" />
                <Label text="Chia sẻ" row="0" col="1" textWrap="true" class="postlcs" />
            </GridLayout>
    </GridLayout>
</template>

<script>
export default {
    props: ["likeHandle", "likeBoolean"]
}
</script>

<style>

</style>