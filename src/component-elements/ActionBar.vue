<template>
        
        <ActionItem  text="Right"   @tap="" android.position="popup" >
            <Image :src="'~/assets/images/' + user.image" stretch="aspectFill" class="avatarUser imgItem"/>
            
        </ActionItem>
        <!-- <ActionItem  text="Right"   @tap="" android.position="popup" >
            <Label text="Đăng xuất" textWrap="true" />
                        
        </ActionItem> -->
        
       
     
        
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