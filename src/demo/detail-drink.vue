<template>
    <Page>
        <ActionBar title="Title" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack" />
          <ActionItem icon="" text="Left" ios.position="left" @tap="" />
          <ActionItem icon="" text="Right" ios.position="right" @tap="" />
        </ActionBar>
        <StackLayout>
            <Label text="Detail Drink" textWrap="true" />
            
        </StackLayout>
    </Page>
</template>

<script>
export default {

}
</script>

<style>

</style>