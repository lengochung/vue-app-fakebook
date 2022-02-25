<template>
  <Page>
      <ActionBar title="Nước uống" icon="">
        <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        <StackLayout orientation="horizontal">
            <SearchBar id="searchBar" hint="Tìm kiếm"
                v-model="textSearch"
                width="80%" height="50" @clear="onClear" @submit="onSubmit" />
            <Image src="~/assets/iml6/giohang.png" @tap="toCartPage" width="50" height="50" />
            
        </StackLayout>
      </ActionBar>
      
          <ListView for="obj in listview">
            <v-template>
              <StackLayout>
                <Label :text="obj.header" paddingLeft="10" marginTop="10"
                    color="red" fontSize="20" backgroundColor="lightgray" />
                <!--  -->
                <GridLayout 
                    v-for="item in obj.items" :key="item.name"
                   rows="auto, 20" columns="auto, *, auto, auto">
                    <Image :src="item.imgsrc" col="0" row="0"
                        fontSize="20"
                        horizontalAlignment="left"
                        verticalAlignment="bottom" 
                        width="50" height="50" stretch="aspectFit"/>
                    <Label col="1" row="0" :text="item.name" 
                        horizontalAlignment="left"
                        verticalAlignment="center"
                        textWrap="true" fontSize="18" />
                    <Label col="2" row="0" :text="item.quantity" 
                        horizontalAlignment="right"
                        verticalAlignment="center"
                        textWrap="true" fontSize="16" />
                    <Button col="3" row="0" text="Mua" 
                        @tap="addCart(item)" backgroundColor="green" />
                    
                    
                </GridLayout>

              </StackLayout>
            </v-template>
          </ListView>
        
      
  </Page>
</template>

<script>
import db from "./data"
import Cart from "./Cart.vue"
export default {
    data: () => ({
        drinks: db.drinks,
        textSearch: "",
        cart: []
    }),
    computed: {
        listview() {
            if(this.textSearch==="")
                return this.drinks
            else {
                let output = []
                this.drinks.forEach(e => {
                    output.push({
                        header: e.header,
                        items: e.items
                                .filter(item => item.name.toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1)
                    })
                });
                return output
            }
        }
    },
    methods: {
        addCart(item) {
            if(this.cart.some(e => e.name === item.name)) {
                // Do nothing
            } else {
                this.cart = [...this.cart, item] // push cart
            }
        },
        toCartPage() {
            this.$navigateTo(Cart, {
                props: {
                    cart: this.cart
                },
                transition: {
                    name: "slideTop", duration: 300, curve: "easeIn"
                }
            })
        }
    },
}
</script>

<style>

</style>