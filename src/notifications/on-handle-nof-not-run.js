import PostDetail from "../components/PostDetail.vue"


const loginFromResponseNofPost = (user, thi) => {
    // this.$store.mutation.setLogin(user)
    thi.$navigateTo(PostDetail, {
        props: {
            i: 4 
        }
    })
}

export { loginFromResponseNofPost }