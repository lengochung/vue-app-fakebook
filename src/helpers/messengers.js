const messenger = {
    formatLengthMessengeList(list=[]) {
        list.forEach(item => {
            if(item.message.length >= 25)
                item.message = item.message.substring(0, 24) + " ..."
        })
        return list
    }
}

export default messenger