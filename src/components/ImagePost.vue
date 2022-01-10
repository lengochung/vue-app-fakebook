<template>
  <Page>
      <ActionBar class="hiddenActionBar"></ActionBar>
      <AbsoluteLayout style="background: black;">
        
        <!-- <StackLayout top="0" left="0" class="imagefullscreen">
          <Image :src="post.imagePost" stretch="aspectFill" @tap="$navigateBack" />
        </StackLayout> --> 
        <ScrollView top="0" left="0" class="imagefullscreen">
          <Image :src="post.imagePost" stretch="aspectFit" @tap="$navigateBack" />
        </ScrollView>
        <GridLayout  columns="*, auto, *" rows="*, *" top="0" left="0" class="infoImagePost">
             
                <Image :src="'~/assets/images/' + post.image"
                    stretch="aspectFill" class="avatarUser back"
                    row="0" col="0" />
                <Label :text="post.uname" textWrap="true" class="nameUser"
                    row="0" col="1"  /> 
                <!-- <FlexboxLayout class="content" justifyContent="flex-end" flexDirection="column" 
                    row="1" col="0" colSpan="3">
                              
                
                </FlexboxLayout> -->
        </GridLayout> 
        
      </AbsoluteLayout>
  </Page>
</template>

<script>
export default {
    props: ["post"]
}
</script>

<style>
    .imagefullscreen {
        width: 100%; height: 100%;
    }
    .infoImagePost {
        margin-top: 40px; margin-left: 40px;
        /* background: black; opacity: 0.5; */
        color: rgb(214, 208, 208);
    }
    .infoImagePost .nameUser {
        margin-left: 20px; font-weight: bold; margin-top: 10px;
        font-size: 18px;
    }
    .content {
        color: white;
    }
</style>