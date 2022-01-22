import DB from "../APIs"
import helper from "../helpers";

const moduleMessenger = {
    state: {
        messages: [],
        listUid: []
    },
    mutations: {
        setMessages: (state, messages) => { state.messages = messages },
        setListUid: (state, listUid) => { state.listUid = listUid },
    },
    getters: {
        messages: state => state.messages
    },
    actions: {
        getMessages: ({ commit, getters }) => {
            DB.messenger(getters.user.username)
                .getMessages()
                .then(rs => {
                    let messages = rs.result.messages
                    let listUid = rs.result.list
                    // 
                    messages.forEach(msg => {
                        msg.photo = helper.posts.formatUrlImage(msg.photo)
                        msg.image = helper.posts.formatUrlImage(msg.image)
                        msg.timeSend = helper.posts.formatDate(msg.timeSend)
                    });
                    let list = []
                    listUid.forEach(uid => {
                        list.push(
                            messages.find(msg => msg.uid == uid)
                        )
                    });
                    // 
                    commit("setMessages", messages)
                    commit("setListUid", list)

                }).catch(err => {
                    commit("setMessages", getters.messages)
                    commit("setListUid", getters.listUid)
                });
        }
    }
}

export default moduleMessenger