<style>
.avatarUser {
  width: 100px;
  height: 100px;
  border-radius: 360px;
}
.imgcreatepost {
  width: 100px;
  height: 100px;
}
.imagePicker {
  width: 70%;
  height: auto;
  margin: 10px 15%;
}
.alertloadImage {
  color: rgb(128, 27, 27);
  margin: 10px auto;
}
</style>

<template>
  <Page>
    <ActionBar icon="">
      <NavigationButton
        text="Back"
        android.systemIcon="ic_menu_back"
        style="color: black"
        @tap="$navigateBack"
      />
      <Label
        text="Bài Viết Mới"
        style="font-size: 20px; font-weight: bold"
        textWrap="true"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout v-if="!busy">
        <TextView
          hint="Bạn đang nghĩ gì ..."
          height="100"
          v-model="textInput"
          editable="true"
        />
        <GridLayout
          rows="*, *"
          columns="*, *"
          height="100"
          @tap="selectPicture"
        >
          <FlexboxLayout
            row="0"
            col="0"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="res://uploadimg"
              stretch="aspectFill"
              class="imgcreatepost"
            />
            <Label text="Ảnh" textWrap="true" />
          </FlexboxLayout>
          <Button text="Đăng" @tap="submitPost" row="0" col="1" />
        </GridLayout>
        <StackLayout class="imagePicker">
          <Label
            v-if="onloadImg"
            class="alertloadImage"
            text="Nạp ảnh thất bại, chọn lại ảnh"
            textWrap="true"
            @tap="selectPicture"
          />
          <Image :src="value" stretch="aspectFill" />
        </StackLayout>
      </StackLayout>
      <ActivityIndicator
        v-if="busy"
        width="100"
        height="100"
        class="busy"
        :busy="busy"
      />
    </ScrollView>
  </Page>
</template>

<script>
import config from "../config";
import { Dialogs, ImageSource } from "@nativescript/core";

var imagepicker = require("@nativescript/imagepicker");

import { mapGetters, mapMutations } from "vuex";
import DB from "../APIs";

export default {
    created() {},
    components: {},
    computed: {
        ...mapGetters(["user"]),
    },
    methods: {
        selectPicture() {
        this.onloadImg = false;
        const context = imagepicker.create({ mode: "single" });
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => {
            selection.forEach((selected) => {
                ImageSource.fromAsset(selected).then((imgSrc) => {
                    this.value = selected.android;
                    this.base64_code = imgSrc.resize(500).toBase64String("png" | "jpg" | "jpeg"); //Save tmp file
                });
            });
            });
        },
        
        submitPost() {
        if (this.textInput !== "") {
            this.busy = true;

            this.filename = Math.floor(Math.random() * 100000 + 10000);

            let formData = new FormData();
            formData.append("filename", this.filename);
            formData.append("file", this.base64_code);

            console.log("Running");
            // Upload image first then insert Post
            fetch(config.PATH_API_UPLOAD_IMG, {
                method: "POST",
                body: formData,
            })
            .then((rs) => rs.json())
            .then((rs) => {
                // Insert Post when upload image done
                DB.load("posts")
                    .insert(this.user.uid, this.textInput, this.filename + ".png")
                    .then((rs) => {
                        this.$navigateBack();
                    })
                    .catch((err) => {
                        this.busy = false;
                        Dialogs.alert("Đăng bài thất bại");
                    });
            })
            .catch((err) => { this.onloadImg = true });
            
        }
        },
    },
    data: () => ({
        textInput: "",
        value: null,
        filename: null,
        onloadImg: false,
        busy: false,
        base64_code: null,
    }),
    mounted() {},
};
</script>
