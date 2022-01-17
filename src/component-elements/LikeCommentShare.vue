<template>
   <GridLayout dock="top" columns="*, *, *" style="padding: 20px 0;">
            <!-- Like -->
            <GridLayout col="0"  columns="*,auto, *" @tap="likeHandle" width="33%">
                <Image src="res://like2" row="0" column="0" class="postIcon" stretch="aspectFill" />
                <Label text="Thích" row="0" col="1" textWrap="true" class="postlcs"
                    :class="likeBoolean ? 'liked' : ''" />
                    <!-- :style="{ color: likeBoolean ? 'blue' : 'black' }" /> -->
            </GridLayout>
            <!-- Comment -->
            <GridLayout col="1"  columns="*, auto, *" width="33%">
                <Image src="res://comment" row="0" column="0" class="postIcon" stretch="aspectFill" />
                <Label text="Bình luận" row="0" col="1" textWrap="true" class="postlcs" />
            </GridLayout>
            <!-- Share -->
            <GridLayout col="2"  columns="*, auto, *" width="33%">
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
    .liked {
        color: rgb(72, 89, 245); font-weight: bold;
    }
   
</style>