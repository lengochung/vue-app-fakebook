<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
  .imgcreatepost {
       width: 100px; height: 100px;
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
    <StackLayout >
        <TextView hint="Bạn đang nghĩ gì ..." height="20%"
            v-model="textInput" editable="true" />
        <GridLayout rows="*, *" columns="*, *" height="100" @tap="chooseImg">
            <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                <Image src="res://uploadimg"
                    stretch="aspectFill" class="imgcreatepost" />
                <Label text="Ảnh" textWrap="true" />
                
            </FlexboxLayout>
          <Button text="Đăng" @tap="createPost" row="0" col="1" />
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
    },
    chooseImg() {
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