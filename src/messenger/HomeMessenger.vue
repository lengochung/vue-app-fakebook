<template>
    <Page>
        <ActionBar title="Chat" icon="">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <!-- <ActionItem icon="" text="Left" ios.position="left" @tap="" />
            <ActionItem icon="" text="Right" ios.position="right" @tap="" /> -->
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
                <StackLayout orientation="horizontal" style="margin-left: 10em;">
                    <StackLayout v-for="userItem in list" :key="userItem.uid" 
                        @tap="goChat(userItem)" class="itemChat">
                    
                        <ImageChat :image="userItem.image" :status="userItem.status" />
                        <Label :text="userItem.uname" textWrap="true" />
                        
                    </StackLayout>
                    <StackLayout>
                        <Label :style="{
                                    margin: '20em auto'
                                }"
                            :text="list.length === 0 ? 'Không có kết quả tìm kiếm' : ''" textWrap="true" />
                        
                    </StackLayout>
                </StackLayout>
            </ScrollView>
            <StackLayout dock="bottom">
                <ListView style="margin: 5em 12em;"
                    class="posts" for="item in listChat"
                    separatorColor="transparent" >
                    <v-template>
                        <GridLayout rows="*" columns="auto, *, auto" style="padding: 5em 0;">
                            <ImageChat row="0" col="0" @tap="goChat(item)"
                                 :image="item.image" :status="item.status" />
                            <FlexboxLayout row="0" col="1" style="margin-left: 10em;"
                                @tap="goChat(item)"
                                justifyContent="center" flexDirection="column">
                                <Label :text="item.uname" textWrap="true" 
                                    :style="{
                                            fontWeight: item.seen === '0'&&item.type === 'recieve' ? 'bold': '',
                                            fontSize: '18px'
                                        }"
                                 />
                                <Label :text="(item.type === 'send' ? 'Bạn: ' : '') + item.message" 
                                    :style="{
                                        fontWeight: item.seen == '0'&&item.type == 'recieve' ? 'bold': ''
                                    }"
                                    textWrap="true" />
                                 
                            </FlexboxLayout>
                            <FlexboxLayout row="0" col="2" style="width: 20em;"
                                justifyContent="center" flexDirection="column" alignItems="center">
                                <Label textWrap="true"
                                    :style="{
                                        background: item.seen === '0'&&item.type === 'recieve' ? 'blue' : 'white', 
                                        width: '12em', height: '12em', borderRadius: '360px'
                                    }"
                                 />
                                
                            </FlexboxLayout> 
                            
                        </GridLayout>                        
                    </v-template> 
                </ListView> 
            </StackLayout>
        </DockLayout>
    </Page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ImageChat from "./ImageChat.vue"
import Chat from "./Chat.vue"
export default {
    components: {
        ImageChat
    },
    created() {
        this.realtimeusers = setInterval(() => {
            this.$store.dispatch("getUsers")
            this.$store.dispatch("getMessages")
            
        }, 3000);
    },
    data: () => ({
        textSearch: "",
    }), 
    computed: {
        ...mapGetters(["listChat", "user", "users"]),
        list() {
            let listOutput = []
            if(this.textSearch!=="")
                listOutput = this.users.filter(
                    user => user.uname.toLowerCase().indexOf(this.textSearch.trim().toLowerCase()) > -1
                )
            else
                listOutput = this.users
            // 
            return listOutput.sort(this.compare).filter(user => user.uid !== this.user.uid)
        }
    },
    methods: {
        goChat(userItem) { 
            console.log(userItem);
            this.$navigateTo(Chat, {
                props: {
                    userItem: userItem
                }
            })
        },
        onClear() {
            // clearInterval(this.realtimeusers)
        },
        onSubmit() {
            console.log("Submit search ------------------", this.textSearch);
        },
        compare(a, b) {
            return parseInt(b.status) - parseInt(a.status)
        }
    },
}
</script>

<style>
    .itemChat {
        margin: 15em 5em; 
        width: 60em; height: 95em;
        text-align: center;
    }
    .imageChat {
        width: 60em; height: 60em;
        border-radius: 360px;
    }
</style>