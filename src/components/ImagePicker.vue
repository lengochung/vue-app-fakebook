<template>
    <Page>
        <ActionBar title="Title" icon="">
          <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goBack" />
          <ActionItem icon="" text="Left" ios.position="left" />
          <ActionItem icon="" text="Right" ios.position="right"  />
        </ActionBar>
      <StackLayout class="btn btn-grey">
        <Label text="upload" @tap="selectPicture()"></Label>
        <Button class="btn btn-primary" text="Submit" @tap="submit()"></Button>
      </StackLayout>
      
    </Page>
</template>

<script>
// import { Image } from 'tns-core-modules/ui/image';
// import {File, knownFolders, path} from 'tns-core-modules/file-system';
import { ImageSource } from 'tns-core-modules/image-source';


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
                        .then(() => {
                                this.saveFile(image); //Save tmp file
                        });
                });
            });
    },
      
    saveFile(source) {  
        // const image = new Image();
        
        // const folderPath = knownFolders.documents().path;
        // image.src = source.android;
        // console.log(image);

        // const fileName = image.src.toString().split('/').pop();
        // const filePath = path.join(folderPath, fileName);
        
        // if (saveIt) {
        //   const imageSource = new ImageSource();
        //   const saved = imageSource.saveToFile(filePath, 'png');

        //   if (!saved) {
        //     console.log('[UploadFile] - Cannot save file!');
        //   }
        // }
        
        // this.value = File.fromPath(filePath);
        // console.log('[UploadField] -->', fileName);
    },    
    submit() {
        const params = new FormData();
        params.append('file', this.value);
        
        // axios({
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   method: 'POST',
        //   params,
        // })
        //   .then((response) => console.log(response));
    },
  },
  

};
</script>