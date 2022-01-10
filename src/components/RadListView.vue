<template>

    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!" android:flat="true"/>
        <StackLayout android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
              <RadListView ref="listView" for="(item, i) in provinces"
                @itemTap="itemTap" swipeActions="true"
                @itemSwipeProgressStarted="onSwipe"
              >
                <v-template>
                  <StackLayout orientation="vertical" backgroundColor="green">
                    <Label 
                      class="message" 
                      :text="item.province" 
                      horizontalAlignment="left" 
                    />     
                    <Label :text="item.city" class="h3" textWrap="true" />           
                  </StackLayout>
                </v-template>
                <v-template name="itemswipe">
                  <GridLayout columns="auto, *, auto" backgroundColor="red">
                    <StackLayout @tap="onLeftClick"
                      id="edit-view" col="0" class="swipe-item left" >
                      <Label text="Edit" textAlignment="center" width="70" height="70" @tap="showModal" />
                    </StackLayout>
                    <StackLayout @tap="onRightClick"
                      id="delete-view" col="2" class="swipe-item right" >
                      <Label text="Delete" textAlignment="center" width="70" height="70" />
                    </StackLayout>
                  </GridLayout>
                </v-template>
              </RadListView>
              
        </StackLayout>
    </Page>
</template>

<script >
 const Modal = {
   props: ["item"],
   template: `
    <Frame>
      <Page>
        <ActionBar title="This is Modal" />
        <StackLayout>
          <TextField v-model="city" hint="City" />
          <TextField v-model="province" hint="Province" />
          <Button text="Save" @tap="close" />
        </StackLayout>
      </Page>
    </Frame>
   `,
    data() {
     return {
       city: this.item.city,
       province: this.item.province
     }
   },
   methods: {
     close() {
       this.$modal.close({
         province: this.province,
         city: this.city
       })
     }
   },
 };
  export default {
   
    computed: {
        
    },
    methods: {
        showModal({object}) {
          this.$showModal(Modal, { props: { item: object.bindingContext} }).then(rs => {
            const index = this.provinces.indexOf(object.bindingContext)
            this.provinces[index].province = rs.province
            this.provinces[index].city = rs.city
          })
        },
        onSwipe ({ data, object }) {
          const swipelimit = data.swipeLimits
          const swipeview = object
          //show view
          const left = swipeview.getViewById("edit-view")
          const right = swipeview.getViewById("delete-view")
          // Nguong keo'
          swipelimit.left = left.getMeasuredWidth()
          swipelimit.right = right.getMeasuredWidth()
          swipelimit.threshold = left.getMeasuredWidth()/2
        },
        itemTap (item) {
          console.log(item)
        },
        // 
        showConfirm() {
          confirm('Message').then((result) => {
            console.log(result)
          })
        },
    },
    data() {
      return {
        provinces: [
          {
            province: "An Giang", city: "Long Xuyen",
          },
          {
            province: "Kien Giang", city: "Rach Gia",
          },
          {
            province: "Dong Thap", city: "Sa Dec",
          },
          {
            province: "Binh Duong", city: "Thu Dau Mot",
          },
        ],
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: grey;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: left;
        font-size: 20;
        color: #333333;
    }
    .red{
       vertical-align: center;
        text-align: left;
        font-size: 20;
        color: #333333;
        background: red;
    }
</style>