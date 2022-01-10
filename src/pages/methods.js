import Logged from "./logged.vue";

import { mapMutations } from "vuex";
import DB from "../APIs";

const methods = {
    // component Login
    loginHandle() {
        // Ẩn form đăng nhập, hiển thị loading
        this.hidden = true
        // Lấy dữ liệu từ server mysql
        DB.load("users").getAll().then(rs => {
            this.alert = { user: "", password: ""};
            // Xác minh user
            if(rs.result.some(user => user.username === this.inputText.user)) {
                // Xác minh mật khẩu
                if(rs.result.some(user => user.username === this.inputText.user && user.password === this.inputText.password)) {
                    
                    // Đăng nhập thành công
                    let newUser = rs.result.find(user => user.username === this.inputText.user && user.password === this.inputText.password)

                    this.setLogin( newUser ) 
                    // 
                    DB.load("users").updateWhere('status', 1, 'uid', newUser.uid)
                        .then(rs => {
                            // Hidden false
                            this.hidden = false
                            // Chuyển hướng
                            this.$navigateTo(Logged, {
                                transition: {
                                    name: "slideLeft", duration: 300, curve: "easeIn"
                                }
                            })
                        })
                } else {
                    this.alert.password = "Mật khẩu không đúng "
                    return Promise.reject()
                }
            } else {
                this.alert.user = "Tài khoản không tồn tại "
                return Promise.reject()
            }
        }).catch((err) => {
            this.hidden = false
        });
    }
}

export default methods