import helper from "../helpers"
import ImagePost from "../components/ImagePost.vue"
import DB from "../APIs"

const methods = {
    likeHandle() {
      if(this.post.likeBoolean){
        helper.likes.dislike(this.user, this.post)
        this.post.likes = this.post.likes.filter(like => like.uid !== this.user.uid)
      } else {
        helper.likes.like(this.user, this.post)
        .then((result) => {
          // 
          DB.load('bells').insert(
            this.post.uid, this.post.pid, this.user.uname, 
            'đã thích bài viết của bạn', 
            this.user.image.split('/').reverse()[0]
            );
        })
        this.post.likes = [...this.post.likes, this.user]
      }

      this.post.likeBoolean = !this.post.likeBoolean

      this.post.textLike = helper.posts.formatInfoTextLike(this.user, this.post.likes)
    
    },
    tapImage() {
      this.$navigateTo(ImagePost, {
        props: {
          post: this.post
        },
        transition: {
          name: "slideTop", duration: 300, curve: "easeIn"
        }
      }) 
    },
    sendComment() { 
        if(this.textComment !== "") {
            DB.load("comments").insert(this.user.uid, this.post.pid, this.textComment)
              .then((result) => {
                DB.load('bells').insert(
                  this.post.uid, this.post.pid, this.user.uname, 
                  'đã bình luận về bài viết của bạn',
                  this.user.image.split('/').reverse()[0]
                  ).then(rs => {
                    this.textComment = ""
                  })
              })
        } 
        this.upHeightScroll()
    }
  }

  export default methods 