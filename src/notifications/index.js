import { Color } from "@nativescript/core/color";
import { LocalNotifications } from "@nativescript/local-notifications";
import { Dialogs } from '@nativescript/core';

const nof = {
    hasPermission() {
        // Dialogs.action({
        //     title: "Cho phép fakeBook thông báo",
        //     actions: ["Cho phép"],
        //     cancelButtonText: "Không"
        // }).then(rs => { LocalNotifications.hasPermission() })
        //     .catch(err => { console.log(err); })
        LocalNotifications.requestPermission()
            .then(rs => {
                console.log(rs);
            }).catch(err => {
                console.log(err);
            })
    },
    onTapScheduleNotification(arraySchedule) {
        LocalNotifications.schedule(arraySchedule);
    },
    onTapCancelAll() {
        LocalNotifications.cancelAll()
            .then(() => {
              Dialogs.alert({
                title: "All canceled",
                okButtonText: "Awesome!"
              });
            })
            .catch(error => console.log("doCancelAll error: " + error));
    },
    demo: () => LocalNotifications.schedule([{
                    id: Math.floor(Math.random()*1000),
                    title: "Demo",
                    subtitle: "Bài viết mới",
                    body: "Demo body",
                    bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
                    color: new Color("green"),
                    image: "",
                    thumbnail: "",
                    forceShowWhenInForeground: true, 
                    channel: "vue-channel",
                    ticker: "Special ticker",
                    at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now,
                    data: ["hung", "121"],
                    actions: [
                        {
                            id: "yes",
                            type: "button",
                            title: "Xem ngay",
                            launch: true,
                        },
                        {
                            id: "no",
                            type: "button",
                            title: "Thấy rồi",
                            launch: false,
                        }
                    ],
                }
    ])
}

export default nof