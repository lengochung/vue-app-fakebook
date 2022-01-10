<template>
        
        <ActionItem  text="Right"   @tap="" >
            <Image :src="'~/assets/images/' + user.image" stretch="aspectFill" class="avatarUser imgItem"/>
            
        </ActionItem>
        
</template>

<script>
export default {
    props: ["user"],
    data: () => ({
        
    })

}
</script>

<style>
    .imgItem {
        margin-right: 50px;
    }
</style>