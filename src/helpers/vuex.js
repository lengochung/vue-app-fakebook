import { time } from "@nativescript/core/profiling"

const helper = {
    formatDate: dateString => {
        let date = new Date(dateString).getTime()
        let different = time() - date
        // const [hour, minute, second] = [Math.floor(different/(1000*60*60)%24), Math.floor(different/60000%60), Math.floor(different/1000%60)]
        if(different <= 90000)
            return "Vừa xong"
        else if(different < 3600000)
                return Math.floor(Math.floor(different/60000)) + " phút trước"
            else if(different < 24*3600000)
                    return Math.floor(different/(1000*60*60)) + " giờ trước"
                else if(different < 24*3600000*3)
                        return Math.floor(different/(1000*60*60)/24) + " ngày trước"
                    else return dateString 
    },
    formatInfoTextLike(user, likes) {
        if(likes.some(like => like.uid === user.uid)) {
            if(likes.length > 1)
                return "Bạn và " + (likes.length - 1) + " người khác"
            else
                return "Bạn"
        } else {
            if(likes.length < 2)
                if(likes.length === 0)
                    return ''
                else
                    return likes[0].uname
            else
                return likes[0].uname + " và " + (likes.length - 1) + " người khác"
        }
    }
}

export default helper