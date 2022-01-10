<template>

    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Tab 1">
                <ListView for="(item, i) in users">
                  <v-template>
                    <StackLayout top='30'>
                      <Label top="i*30" left='30' :text="item.uname + i" />
                    </StackLayout>
                  </v-template>
                </ListView>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <AbsoluteLayout>
                  <Label text="Label 1" align="center" top="10" left="10" width="100" height="100" backgroundColor="black" />
                  <Label text="Label 2" align="center" top="10" left="120" width="100" height="100" backgroundColor="green" />
                  <Label text="Label 3" top="120" left="10" width="100" height="100" backgroundColor="red" />
                  <Label text="Label 4" top="120" left="120" width="100" height="100" backgroundColor="yellow" />
                  <Label text="Label 5 dsfkj dslfkh sldkf asldkf saldkfh sldkf ls dfjlsldkfh sldkhf" 
                    top="240" left="120" width="auto" height="100" backgroundColor="brown" />
                </AbsoluteLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script >
import { mapActions, mapGetters, mapMutations } from "vuex";

  export default {
    components: {
     
    },
    mounted() {
        this.$store.dispatch("getUsers")
    },
    computed: {
        ...mapGetters(["users"])
    },
    methods: {
        ...mapMutations(["getUsers"]),
        ...mapActions(["getUsers"])
    },
    data() {
      return {
        msg: "1223",
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: grey;
        color: #ffffff;
    }

    Label {
      text-align: center; 
      height: 150px;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>