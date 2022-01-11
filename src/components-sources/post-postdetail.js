import helper from "../helpers"
import ImagePost from "../components/ImagePost.vue"

const methods = {
    likeHandle() {
      if(this.post.likeBoolean){
        helper.likes.dislike(this.user, this.post)
        this.post.likes = this.post.likes.filter(like => like.uid !== this.user.uid)
      } else {
        helper.likes.like(this.user, this.post)
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
    }
  }

  export default methods