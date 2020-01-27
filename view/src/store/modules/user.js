// /src/store/modules/user.js
import Storage from "@/store/storage";
const state = {
  //token
  token: Storage.get("token"),
  usercode: Storage.get("usercode"),
  username: Storage.get("username")
};
const actions = {
  setToken({ commit }, data) {
    commit("token", data);
  },
  setUsercode({ commit }, data) {
    commit("usercode", data);
  },
  setUsername({ commit }, data) {
    commit("username", data);
  }
};
const mutations = {
  setToken(state, data) {
    Storage.set("token", data);
    state.token = Storage.get("token");
  },
  setUsercode(state, data) {
    Storage.set("usercode", data);
    state.usercode = Storage.get("usercode");
  },
  setUsername(state, data) {
    Storage.set("username", data);
    state.username = Storage.get("username");
  }
};
export default {
  state,
  actions,
  mutations
};