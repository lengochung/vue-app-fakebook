<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
</style>

<template>
    <Page>
       
      <ActionBar icon="">
        <NavigationButton text="Back" android.systemIcon="ic_menu_back"
            style="color: black;"
            @tap="$navigateBack" />
        <Label text="Bài Viết Mới"
            style="font-size: 20px; font-weight: bold;"
            textWrap="true" />
        
      </ActionBar>
    <StackLayout>
        <TextView hint="Bạn đang nghĩ gì ..." height="20%"
            v-model="textInput" editable="true" />
        <GridLayout rows="*" columns="*, *">
          <Image src="res://uploadimg" stretch="aspectFill" width="100" height="100" />
          <Button text="Đăng" @tap="createPost" />
        </GridLayout>
        
          
    </StackLayout>
  </Page>
</template>

<script>


import { mapGetters, mapMutations } from "vuex"

export default { 
  created() {
    
  },
  components: {
    
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    createPost() {
        console.log(this.textInput);
    }
  },
  data: () => ({
    textInput: ""
  }),
  mounted() { 
      
  }
}
</script>