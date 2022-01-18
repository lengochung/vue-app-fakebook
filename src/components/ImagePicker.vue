<template>
    <Page>
        <ActionBar title="Title" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" />
          <ActionItem icon="" text="Left" ios.position="left" />
          <ActionItem icon="" text="Right" ios.position="right"  />
        </ActionBar>
      <StackLayout class="btn btn-grey">
        <Label text="upload" @tap="selectPicture()"></Label>
        <Button class="btn btn-primary" text="Submit" @tap="submit()"></Button>
        <Image :src="value" stretch="none" ref="image" />
        
      </StackLayout>
      
    </Page>
</template>

<script>
import config from '../config';
import { ImageSource } from '@nativescript/core';
import { Image } from '@nativescript/core/ui/image';
import { File, knownFolders, path } from '@nativescript/core/file-system';


var imagepicker = require("@nativescript/imagepicker");

export default {
  data() {
    return {
      value: null,
    };
  },
  methods: {
    selectPicture() {       
        const context = imagepicker.create({ mode: "single" });
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => {
                selection.forEach((image) => {
                    ImageSource.fromAsset(image)
                        .then((imgSrc) => {
                            this.value = image.android
                         
                            this.saveFile(imgSrc.toBase64String("png"|"jpg"|"jpeg", 32)); //Save tmp file
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
        .then(rs => alert("Thanh cong"))
        .catch(err => alert("That bai"))     
    },     
    submit() { 
        
    },
  },
};  
</script>