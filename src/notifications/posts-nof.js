import { Dialogs } from "@nativescript/core"
import { Color } from "@nativescript/core/color";
import nof from "."

const onSchedulePost = (oldPosts, newPosts, user) => {
    const length = newPosts.length - oldPosts.length
    let arraySchedule = []
    if( oldPosts.length > 0 && length > 0) {
        for (let i = 0; i < length; i++) {
            let post = newPosts[i]

            if(post.uid!==user.uid) {
                arraySchedule.push({
                    id: Math.floor(Math.random()*1000),
                    title: post.uname + " đã thêm bài viết mới",
                    subtitle: "Bài viết mới",
                    body: post.content,
                    bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
                    color: new Color("green"),
                    image: post.imagePost,
                    thumbnail: post.image,
                    forceShowWhenInForeground: true, 
                    channel: "vue-channel",
                    ticker: "Special ticker",
                    at: new Date(new Date().getTime() + (5 * 1000)), // 5 seconds from now,
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
                })
            }
        }
        // 
        if(arraySchedule.length > 0)
            nof.onTapScheduleNotification(arraySchedule);
       
    }
}

export { onSchedulePost }