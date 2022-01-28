import DB from "../APIs"
import helper from "../helpers";

const moduleMessenger = {
    state: {
        messages: [],
        listChat: []
    },
    mutations: {
        setMessages: (state, messages) => { state.messages = messages },
        setListChat: (state, listChat) => { state.listChat = listChat },
    },
    getters: {
        messages: state => state.messages,
        listChat: state => state.listChat,
    },
    actions: {
        getMessages: ({ commit, getters }) => {
            // DB.messenger(getters.user.username)
            DB.messenger('max')
                .getMessages()
                .then(rs => {
                    console.log("mesage realtime"); 
                    let messages = rs.result.messages
                    let list = rs.result.list
                    // 
                    messages.forEach(msg => {
                        msg.photo = helper.posts.formatUrlImage(msg.photo)
                        msg.image = helper.posts.formatUrlImage(msg.image)
                        msg.timeSend = helper.posts.formatDate(msg.timeSend)
                    });
                    let listChat = []
                    list.forEach(item => {
                        listChat.push(
                            messages.find(msg => msg.uid == item.uid)
                        )
                    });
                    console.log(messages);
                    // listChat = helper.messenger.formatLengthMessengeList(listChat)
                
                    // 
                    commit("setMessages", messages)
                    commit("setListChat", listChat)

                }).catch(err => {
                    commit("setMessages", getters.messages)
                    commit("setListChat", getters.listChat)
                });
        }
    }
}

export default moduleMessenger