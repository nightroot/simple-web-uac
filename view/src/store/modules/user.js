import Storage from "@/store/storage";
const state = {
  //token
  token: Storage.get("token"),
  usercode: Storage.get("usercode"),
  username: Storage.get("username"),
  permits: Storage.get("permits")
};
const actions = {//预备动作
  setToken({ commit }, data) {
    commit("token", data);
  },
  setUsercode({ commit }, data) {
    commit("usercode", data);
  },
  setUsername({ commit }, data) {
    commit("username", data);
  },
  setPermits({ commit }, data) {
    commit("permits", data);
  },
  clear(){
    commit("clear")
  }
};
const mutations = {//完成动作
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
  },
  setPermits(state, data) {
    Storage.set("permits", data);
    state.permits = Storage.get("permits");
  },
  clear(){
    Storage.cle();
  }
};
export default {
  state,
  actions,
  mutations
};