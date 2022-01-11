<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
</style>

<template>
    <Page>
      <ActionBar title="fakeBook" icon="">
        <ActionChild :user="user" />
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
                      <Profile />
                  </MDTabContentItem>
                  <MDTabContentItem>
                      <Setting />
                  </MDTabContentItem>

          </MDBottomNavigation>
    </StackLayout>
  </Page>
</template>

<script>
import Home from "../components/Home.vue"
import Profile from "../components/Profile.vue"
import Setting from "../components/Setting.vue"

import ActionChild from "../component-elements/ActionBar.vue"

import { mapGetters } from "vuex"

export default {
  created() {
    this.$store.dispatch("getPosts")
  },
  components: {
    Home, Profile, Setting, ActionChild
  },
  computed: {
    ...mapGetters(["user"])
  },
  data: () => ({
    
  }),
  mounted() { 
      setInterval(() => {
          console.log("Logged", Math.random());
          this.$store.dispatch("getPosts")
      }, 3000); 
  }
}
</script>