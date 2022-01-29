<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
  .messenger {
    background: url(res://messenger) no-repeat;
    background-size: 100% 100%;
    width: 100px; height: 100px; border-radius: 360px;
    color: red; font-weight: bold; font-size: 30px;
    text-align: right;
  }
</style>

<template>
    <Page>
      <ActionBar title="fakeBook" icon="">
        <ActionItem  @tap="toCreatePost" >
            <Image src="res://createpost" stretch="aspectFill" class="avatarUser"/>    
        </ActionItem>
        <Actionitem @tap="messenger">
            <Label class="messenger" text="3" textWrap="true" />
            
        </Actionitem>
        <ActionItem icon="" text="Chỉnh sửa tài khoản" android.position="popup" @tap="goEditProfile" />
        <ActionItem icon="" text="Đăng xuất" android.position="popup" @tap="logout" />
      </ActionBar>
    <StackLayout>
          <MDBottomNavigation selectedIndex="0">
                  <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
                  <MDTabStrip>
                      <MDTabStripItem class="special">
                          <Image src="res://home" class="fas"></Image>
                          <Label text="Feeds" textWrap="true" />
                          
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                            <Image src="res://bell" class="fas"></Image>
                            <Label :text="numBells + ' thông báo'" textWrap="true"
                              :style="{
                                color: numBells > 0 ? 'red' : 'grey', 
                              }"  /> 
                            
                          
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                          <Image src="res://profile" class="fas"></Image>
                          <Label text="Cá nhân" textWrap="true" />
                      </MDTabStripItem>
                  </MDTabStrip>

                  <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
                  <MDTabContentItem>
                      <Home />
                  </MDTabContentItem>
                  <MDTabContentItem>
                      <Bells />
                  </MDTabContentItem>
                  <MDTabContentItem>
                      
                      <Profile :user="user"/>
                  </MDTabContentItem>

          </MDBottomNavigation>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../components/Home.vue"
import Profile from "../components/Profile.vue"
import Bells from "../components/Bells.vue"
import CreatePost from "../components/CreatePost.vue"
import EditProfile from "../components/EditProfile.vue"
import HomeMessenger from "../messenger/HomeMessenger.vue"

import { mapGetters, mapMutations } from "vuex"

export default { 
  created() {
    
    //  setInterval(() => {
        console.log("Realtiming .........................");
          this.$store.dispatch("getPosts")
          this.$store.dispatch("getMessages") 

      // }, 5000);
  },
  components: {
    Home, Profile, Bells
  },
  computed: {
    ...mapGetters(["user", "posts", "bells"]),
    numBells() {
      return this.bells.filter(bell => bell.seen == '0').reduce((a, b) => a + 1, 0)
    }
  },
  methods: {
    ...mapMutations(["setLogout"]),
    logout() {
      this.setLogout()
      this.$navigateBack()
    },
    toCreatePost() {
      this.$navigateTo(CreatePost, {
        transition: {
            name: "slideTop", duration: 300, curve: "easeIn"
        }
      })
    },
    goEditProfile() {
        this.$navigateTo(EditProfile, {
          transition: {
            name: "slideRight", duration: 300, curve: "easeIn"
          }
        })
    },
    messenger() {
      this.$navigateTo(HomeMessenger)
    }
  },
  data: () => ({
    
  }),
  mounted() {
      
  }
}
</script>