<template>
   <FlexboxLayout dock="top" style="padding: 20px 0 20px 50px;"
        justifyContent="space-around" alignItems="center" flexDirection="row"
   >
            <!-- Like -->
            <GridLayout col="0"  columns="auto,auto, *" @tap="likeHandle" width="33%">
                <Image src="res://like2" row="0" column="0" class="iconlcs" stretch="aspectFill" />
                <Label text="Thích" row="0" col="1" textWrap="true" class="postlcs"
                    :class="likeBoolean ? 'liked' : ''" />
            </GridLayout>
            <!-- Comment -->
            <GridLayout col="1"  columns="auto, auto, *" width="33%">
                <Image src="res://comment" row="0" column="0" class="iconlcs" stretch="aspectFill" />
                <Label text="Bình luận" row="0" col="1" textWrap="true" class="postlcs" />
            </GridLayout>
            <!-- Share -->
            <GridLayout col="2"  columns="auto, auto, *" width="33%">
                <Image src="res://share" row="0" column="0" class="iconlcs" stretch="aspectFill" />
                <Label text="Chia sẻ" row="0" col="1" textWrap="true" class="postlcs" />
            </GridLayout>
    </FlexboxLayout>
</template>

<script>

export default {
    props: ["likeHandle", "likeBoolean"],
    methods: {
        
    },
}
</script>

<style>
    .liked {
        color: rgb(72, 89, 245); font-weight: bold;
    }
    .iconlcs {
        width: 80px; height: 80px; border-radius: 360px;
    }
</style>