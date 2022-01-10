import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

const moduleUsers = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}

export default moduleUsers