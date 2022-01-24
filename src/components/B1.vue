<template>
  <Page>
    <ActionBar title="Local Notifications demo"></ActionBar>

    <StackLayout>
      <Button @tap="onTapHasPermission" class="btn" text="Has Permission?"></Button>
      <Button @tap="onTapScheduleNotification" class="btn" text="Schedule Notification"></Button>
      <Button @tap="onTapCancelAll" class="btn" text="Cancel notifications"></Button>
      <Label class="message" :text="message" textWrap="true"></Label>
    </StackLayout>
  </Page>
</template>

<script>
  

import { LocalNotifications } from "@nativescript/local-notifications";
  import nof from "../notifications"
 

  export default {
    created() {
      LocalNotifications.addOnMessageReceivedCallback(notificationData => {
        this.message = JSON.stringify(notificationData);
      });
    },
 
    data() {
      return {
        message: "Tap a button above.."
      }
    },

    methods: {
      onTapHasPermission: nof.hasPermission,

      onTapScheduleNotification: nof.onTapScheduleNotification,

      onTapCancelAll: nof.onTapCancelAll
    }
  } 
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    font-size: 14;
    margin: 16;
    color: #53ba82;
  }

  Button.btn {
    font-size: 14;
    border-radius: 3;
    border-width: 2;
    border-color: #63d4a5;
    color: #63d4a5;
    padding: 12;
    margin: 16;
  }
</style>
