<template>
  <Page>
      <ActionBar title="Giỏ hàng" icon="">
        <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        <!-- <ActionItem icon="" text="Left" ios.position="left" @tap="" />
        <ActionItem icon="" text="Right" ios.position="right" @tap="" /> -->
      </ActionBar>
      <StackLayout>
            <!-- Header -->
            <Label text="HÓA ĐƠN CỦA BẠN" textWrap="true" color="red"
                fontSize="20" />
            <!-- Giỏ hàng -->
            <GridLayout rows="auto, 20" columns="auto, *, auto, auto, auto"
                v-for="item in cart" :key="item.name" >
                   <Image :src="item.imgsrc" col="0" row="0"
                        fontSize="20"
                        horizontalAlignment="left"
                        verticalAlignment="bottom" 
                        width="50" height="50" stretch="aspectFit"/>
                    <Label col="1" row="0" :text="item.name" 
                        horizontalAlignment="left"
                        verticalAlignment="center"
                        textWrap="true" fontSize="18" />
                    <Label col="2" row="0" :text="item.price + ' x '" 
                        horizontalAlignment="right"
                        verticalAlignment="center"
                        textWrap="true" fontSize="16" />
                    <Label col="3" row="0" :text="item.quantity" 
                        horizontalAlignment="right"
                        verticalAlignment="center"
                        textWrap="true" fontSize="16" />
                    <Button col="4" row="0" text="Bỏ" 
                        @tap="" backgroundColor="red" />
            </GridLayout>
            <GridLayout rows="*" columns="auto, auto, auto">
                <Label text="Tổng cộng: "
                    fontSize="20" color="green"
                    row="0" col="0" textWrap="true" />
                <Label :text="total"
                    fontSize="20"
                    row="0" col="1" textWrap="true" />

                
            </GridLayout>
      </StackLayout>
  </Page>
</template>

<script>
export default {
    props: ["cart"],
    computed: {
        total() {
            return this.cart.reduce((a, b) => a + b.quantity*b.price, 0)
        }
    },
}
</script>

<style>

</style>