<style>
  .avatarUser {
    width: 100px; height: 100px; border-radius: 360px;
  }
  .imgcreatepost {
       width: 100px; height: 100px;
  }
  .imagePicker {
    width: 60%; height: auto; margin: 10px 20%;
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
    <ScrollView >
        <StackLayout>
            <TextView hint="Bạn đang nghĩ gì ..." height="100"
                v-model="textInput" editable="true" />  
            <GridLayout rows="*, *" columns="*, *" height="100" @tap="selectPicture">
                <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                    <Image src="res://uploadimg"
                        stretch="aspectFill" class="imgcreatepost" />
                    <Label text="Ảnh" textWrap="true" />
                    
                </FlexboxLayout>
              <Button text="Đăng" @tap="createPost" row="0" col="1" />
            </GridLayout>
            <StackLayout class="imagePicker">
              <Image :src="value" stretch="aspectFill" />
            </StackLayout>
        </StackLayout>
          
    </ScrollView>
  </Page>
</template>

<script>
import config from '../config';
import { ImageSource } from '@nativescript/core';
// import { Image } from '@nativescript/core/ui/image';
// import { File, knownFolders, path } from '@nativescript/core/file-system';

var imagepicker = require("@nativescript/imagepicker");

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
    selectPicture() {       
        const context = imagepicker.create({ mode: "single" });
        context
            .authorize().then(() => context.present())
              .then((selection) => {
                  selection.forEach((selected) => {
                      ImageSource.fromAsset(selected)
                          .then((imgSrc) => {
                              this.value = selected.android
                              this.saveFile(imgSrc.toBase64String("png"|"jpg"|"jpeg")); //Save tmp file
                          });
                  });  
              });    
    },   
    saveFile(img_base64) {  
        let formData = new FormData()
        formData.append("filename", Math.floor(Math.random()*100000 + 10000))
        formData.append("file", img_base64)
       
        console.log("Running");
        fetch(config.PATH_API + "uploadimage.php", {
          method: "POST",
          body: formData 
        }).then(rs => rs.json())
        .then(rs => { alert("Thanh cong"); console.log(rs);})
        .catch(err => alert("That bai"))     
    },     
    submit() {    
        
    },
  },
  data: () => ({
    textInput: "",
    value: null,
  }),
  mounted() { 
      
  }
}
</script>