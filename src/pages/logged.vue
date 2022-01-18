<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
</style>

<template>
    <Page>
      <ActionBar title="fakeBook" icon="">
        <ActionItem  @tap="toCreatePost" >
            <Image src="res://createpost" stretch="aspectFill" class="avatarUser"/>    
        </ActionItem>
        <ActionItem  @tap="" >
            <Image :src="user.image" stretch="aspectFill" class="avatarUser"/>    
        </ActionItem>
        <ActionItem icon="" text="Tài khoản" android.position="popup" @tap="" />
        <ActionItem icon="" text="Đăng xuất" android.position="popup" @tap="logout" />
      </ActionBar>
    <StackLayout>
          <MDBottomNavigation selectedIndex="0">
                  <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
                  <MDTabStrip>
                      <MDTabStripItem>
                          <Image src="res://home" class="fas"></Image>
                          <!-- <Image src="font://&#xf015;" class="fas"></Image> -->
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                          <Image src="res://messenger" class="fas"></Image>
                      </MDTabStripItem>
                      <MDTabStripItem class="special">
                          <Image src="res://profile" class="fas"></Image>
                      </MDTabStripItem>
                  </MDTabStrip>

                  <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
                  <MDTabContentItem>
                      <Home />
                  </MDTabContentItem>
                  <MDTabContentItem>
                      <Setting />
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
import Setting from "../components/Setting.vue"
import CreatePost from "../components/CreatePost.vue"

import { mapGetters, mapMutations } from "vuex"

export default { 
  created() {
    this.$store.dispatch("getPosts")
  },
  components: {
    Home, Profile, Setting
  },
  computed: {
    ...mapGetters(["user", "posts"])
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
    }
  },
  data: () => ({
    
  }),
  mounted() {
      setInterval(() => {
        console.log("Realtiming .........................");
          this.$store.dispatch("getPosts")
      }, 3000); 
  }
}
</script>