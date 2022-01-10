<template>

    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!" android:flat="true"/>
        <StackLayout android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <Label text="FRUIT" fontSize="50" textWrap="true" @tap="changeGroup('a')" />
            <Label text="VEGESTABLES" fontSize="50" textWrap="true" @tap="changeGroup('b')" />
            <Progress value="80%" />
            <SearchBar v-model="text" hint="Enter here"  @submit="searchbar" />
            
            
              <RadListView ref="listView" for="(item, i) in provinces"
                @itemTap="itemTap" swipeAction="true"
                @itemSwipeProgressStarted="onSwipe"
              >
                <v-template>
                  <StackLayout>
                    
                    <Label class="message" :text="item.province" textWrap="true" horizontalAlignment="center" />
                    
                  </StackLayout>
                </v-template>
                <v-template name="itemswipe">

                </v-template>
              </RadListView>
            
        </StackLayout>
    </Page>
</template>

<script >
// import { RadListView } from 'nativescript-ui-listview'

  export default {
    // component: {
    //   RadListView
    // },
    computed: {
        list () {
          let out = []
          out = this.foods.filter(item => item.group == this.group)
          return out
        }
    },
    methods: {
        changeGroup(group) {
          this.group = group
        },
        onSwipe (item) {

        },
        itemTap (item) {

        },
        searchbar(args) {
          console.log(this.text);
        }
    },
    data() {
      return {
        text: "",
        provinces: [
        {
          province: "An Giang",

          city: "Long Xuyen",
        },

        {
          province: "Kien Giang",

          city: "Rach Gia",
        },

        {
          province: "Dong Thap",

          city: "Sa Dec",
        },

        {
          province: "Binh Duong",

          city: "Thu Dau Mot",
        },
      ],

        // msg: "1223",
        // movies : [
        //     { title: 'The Shawshank Redemption (1994)', selected: false },
        //     { title: 'The Godfather (1972)', selected: false },
        //     { title: 'The Godfather: Part II (1974)', selected: true },
        //     { title: 'The Dark Knight (2008)', selected: false },
        //     { title: '12 Angry Men (1957)', selected: false },
        //     { title: 'Schindler\'s List (1993)', selected: false },
        //     { title: 'The Lord of the Rings: The Return of the King (2003)', selected: false },
        //     { title: 'Pulp Fiction (1994)', selected: false }
        // ],
        group: "a",
        // foods: [
        // {
        //   group: "A",
        //   name: "Fruit",
        //   imageSrc: "",
        // },
        // {
        //   group: "a",
        //   name: "Kiwi",
        //   imageSrc: "~/assets/images/kiwi.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Bơ",
        //   imageSrc: "~/assets/images/bo.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Chuối",
        //   imageSrc: "~/assets/images/chuoi.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Táo",
        //   imageSrc: "~/assets/images/tao.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Cam",
        //   imageSrc: "~/assets/images/cam.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Nho",
        //   imageSrc: "~/assets/images/nho.jpg",
        // },
        // {
        //   group: "a",
        //   name: "Dâu Tây",
        //   imageSrc: "~/assets/images/dau.jpg",
        // },
        // {
        //   group: "B",
        //   name: "Vegetables",
        //   imageSrc: "",
        // },
        // {
        //   group: "b",
        //   name: "Súp Lơ",
        //   imageSrc: "~/assets/images/suplo.jpg",
        // },
        // {
        //   group: "b",
        //   name: "Cà Chua",
        //   imageSrc: "~/assets/images/cachua.jpg",
        // },
        // {
        //   group: "b",
        //   name: "Đậu Que",
        //   imageSrc: "~/assets/images/dauque.jpg",
        // },
        // {
        //   group: "b",
        //   name: "Ớt Chuông",
        //   imageSrc: "~/assets/images/otchuong.jpg",
        // },
        // ]
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
        text-align: right;
        font-size: 20;
        color: #333333;
    }
    .red{
       vertical-align: center;
        text-align: left;
        font-size: 20;
        color: #333333;
        background: green;
    }
</style>