<style>
  .c {
    background: rgb(250, 250, 252);
  }
</style>

<template>
    <StackLayout> 
        <ScrollView>
            <DockLayout stretchLastChild="true">
                <GridLayout dock="top" rows="*" columns="*, auto"
                  :style="{
                    height: '120px',
                    margin: '30px 10px 0 10px'
                  }"
                >
                    <Label text="Thông báo" row="0" col="0"
                      style="font-weight: bold; font-size: 18px;" 
                      textWrap="true" />
                    <Label text="Đã xem hết" textWrap="true" row="0" col="1"
                      style="font-size: 16px;" 
                      @tap="seenAll"
                    />
                    
                </GridLayout>
                <!--  -->
                <StackLayout v-for="bell in bells" :key="bell.bid" dock="top"
                    :style="{
                        borderRadius: '20px',
                        background: bell.seen == '0' ? 'rgb(236, 236, 253)' : 'rgb(250, 250, 252)',
                        padding: '30px',
                        margin: '10px' 
                    }"
                    @tap="goPost(bell)"
                  >
                      <GridLayout rows="*" columns="auto, *, auto">
                          <Image row="0" col="0"
                            :src="bell.whoimage" stretch="aspectFill" class="avatarUser" />
                          
                          <StackLayout row="0" col="1" orientation="" >
                              <Label :text="bell.whoname" textWrap="true"
                                style="font-weight: bold; font-size: 15px; margin-left: 20px;" />
                              <Label style="margin-left: 50px;"
                                :text="bell.action" textWrap="true" />
                              
                          </StackLayout>
                          <Label row="0" col="2"
                            style="font-size: 12px;" 
                            :text="bell.actionTime" textWrap="true" />
                          
                      </GridLayout>
                  </StackLayout>
            </DockLayout>
        </ScrollView>
        
    </StackLayout>
</template>

<script>
import { Dialogs } from '@nativescript/core';
import { mapGetters } from 'vuex'
import DB from '../APIs';
import PostDetail from './PostDetail.vue';
export default {
    computed: {
        ...mapGetters(["bells", "user"])
    },
    methods: {
        seenAll() {
          console.log(this.user);
            DB.load("bells").updateWhere("seen", 1, "uid", this.user.uid)
              .then((result) => {
                  
              }).catch((err) => {
                Dialogs.alert({ message: "Vui lòng kiểm tra kết nôi Wifi" })
              });
        },
          goPost(bell) {
            DB.load("bells").deleteWhere(
                // "seen", 1, 
                // "uid", this.user.uid,
                // "pid", bell.pid,
                // "whoname", bell.whoname
                "bid", bell.bid
              ).then(rs => {
                  this.$navigateTo(PostDetail, { 
                      props: { pid: bell.pid },
                      transition: {
                          name: "slideLeft", duration: 300, curve: "easeIn" 
                      }
                  })
              }).catch(err => Dialogs.alert({ message: "Kiểm tra kết nối Wifi" }))
              
          },
    },
    data: () => ({

    })
}
</script>