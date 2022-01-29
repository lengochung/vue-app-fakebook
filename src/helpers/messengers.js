const messenger = {
    formatLengthMessengeList(list=[]) {
        list.forEach(item => {
            if(item.message.length >= 25)
                item.message = item.message.substring(0, 24) + " ..."
        })
        return list
    },
    formatHiddenImage(list = []) {
        for (let i = 1; i < list.length; i++) {
            if(list[i].type === 'recieve') {
                if(list[i-1].type === 'recieve') {
                    list[i-1].image = ''
                }
            }
            
        }
        return list
    }
}

export default messenger