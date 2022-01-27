<template>
    <Page>
        <ActionBar title="Nhắn tin" icon="">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <ActionItem icon="" text="Left" ios.position="left" @tap="" />
            <ActionItem icon="" text="Right" ios.position="right" @tap="" />
        </ActionBar>
         <DockLayout stretchLastChild="true" >
            <!-- <StackLayout dock="top"> -->
                <SearchBar dock="top" v-model="textSearch" 
                    id="searchBar" hint="Tìm kiếm" 
                    @clear="onClear"
                    textFieldBackgroundColor="white"
                    @submit="onSubmit"
                    style="background: grey; width: 100%;" />
            <!-- </StackLayout>  -->
            <ScrollView orientation="horizontal" dock="top">
                <StackLayout orientation="horizontal">
                    <Image  v-for="item in listChat" :key="item.uid"
                        :src="item.image" stretch="aspectFill" class="imageChat"  />
                </StackLayout>
            </ScrollView>
            <StackLayout dock="bottom">
                <ListView
                    class="posts" for="item in list" @itemTap="tapPost">
                    <v-template>
                        <Label :text="item.uname" textWrap="true" />
                        
                    </v-template> 
                </ListView> 
            </StackLayout>
        </DockLayout>
    </Page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        textSearch: ""
    }),
    computed: {
        ...mapGetters(["messages", "listChat", "user"]),
        list() {
            if(this.textSearch=="") {
                return this.listChat
            } else {  
                return this.listChat.filter(item => {
                    let lowerUname = item.uname.toLowerCase()
                    if(lowerUname.indexOf(this.textSearch) > -1)
                        return true
                    return false
                })
            }
        }
    },
    methods: {
        tap() {
            console.log(this.listChat, this.messages);
        },
        onClear() {
            console.log("Clear ....................................", this.textSearch);
        },
        onSubmit() {
            console.log("Submit search ------------------", this.textSearch);
        }
    },
}
</script>

<style>
    .imageChat {
        width: 60em; height: 60em;
        border-radius: 360px;
        margin: 15em 5em; 
    }
</style>