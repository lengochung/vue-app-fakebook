<template>
  <Page>
      <ActionBar title="The Caffe" icon="">
        <ActionItem icon="" android.systemIcon="ic_menu_share" 
            text="Left" ios.position="left" @tap="" />
        <ActionItem icon="" text="Right" android.position="popup"
            ios.position="right" @tap="" />
      </ActionBar>
      <FlexboxLayout flexDirection="column" class="container">
          <Image alignSelf="center" marginTop="46"
            src="~/assets/iml6/food.jpg" stretch="aspectFit" />
        <Label text="" flexGrow="1" />
        <Button text="Menu nước uống" @tap="toDrinkPage" class="btn-drink" />
        <Button text="menu thức ăn" @tap="toFoodPage" class="btn-food"/>
        
        
        
          
          
      </FlexboxLayout>
  </Page>
</template>

<script>
import Drinkpage from "./Drinkpage.vue"
export default {
    methods: {
        toDrinkPage() {
            this.$navigateTo(Drinkpage)
        }
    },
}
</script>

<style>
    ActionBar {
        background: rgb(211, 209, 209);
    }
    .btn-drink {
        background: green;
    }
    .btn-food {
        background: red;
    }
</style>