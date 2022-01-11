import { time } from "@nativescript/core/profiling"
import config from "../config"

const posts = {
    formatDate: dateString => {
        let date = new Date(dateString).getTime() + 7*60*60*1000
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
    formatInfoTextLike(user = {}, likes = []) {
        if(likes===undefined) likes = []
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
    },
    formatPosts (posts = [], user = {}, likes = [], comments = []) {
        posts.forEach(post => {        
            post.date = this.formatDate(post.date)
            post.likes = this.formatUrlImageList(likes.filter(like => like.pid === post.pid))
            post.textLike = this.formatInfoTextLike(user, post.likes)
            post.comments = this.formatComments(comments.filter(cmt => cmt.pid === post.pid))
            post.comments = this.formatUrlImageList(post.comments)
            post.likeBoolean = post.likes.some(like => like.uid === user.uid) ? true : false
            post.imagePost = this.formatUrlImage(post.imagePost)
            post.image = this.formatUrlImage(post.image)
        })
        return posts 
    },
    formatComments(comments) {
        comments.forEach(cmt => {
            cmt.time = this.formatDate(cmt.time)
        });
        return comments
    }, 
    formatUrlImageList(list) {
        list.forEach(item => {
            item.image = this.formatUrlImage(item.image)
        });
        return list
    },
    formatUrlImage(image) {
        if(image !== '')
            return config.URL_IMAGE + image
        return ''
    }
}

export default posts