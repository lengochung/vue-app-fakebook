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
            // 
            let username = this.username.toLowerCase()
            let password = this.password.toLowerCase()
            // Xác minh user
            if(rs.result.some(user => user.username === username)) {
                // Xác minh mật khẩu
                if(rs.result.some(user => user.username === username && user.password === password)) {
                    // Đăng nhập thành công
                    let newUser = rs.result.find(user => user.username === username && user.password === password)

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