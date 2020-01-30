<template>
  <div id="login">
    <h1>{{ result }}</h1>
    <div>
      <p>
        账号：
        <input type="text" name="usercode" size="10" ref="usercode" />
      </p>
      <p>
        密码：
        <input type="password" name="password" size="10" ref="password" />
      </p>
      <p>
        <button @click="login">确定</button>
      </p>
    </div>
  </div>
</template>

<script>
import post from "@/axios/requests";
import iView from "iview";
export default {
  name: "SysLogin",
  data() {
    return {
      title: "后台登录",
      result: "示例数据"
    };
  },
  created: function() {
    if (this.$store.state.user.token.length > 0) {//首页跳转
      this.$emit("changelink", "/sys/admin/index");
    }
    //加载函数
    this.$emit("changetitle", "后台登录");
  },
  methods: {
    //登录事件
    login: function() {
      const param = {
        usercode: (this.result1 = this.$refs.usercode.value),
        password: (this.result1 = this.$refs.password.value)
      };
      post("/sys/authLogin", param).then(result => {
        if (result[0].islogin === "1") {
          this.$store.commit("setToken", result[0].token);
          this.$store.commit("setUsercode", result[0].usercode);
          this.$store.commit("setUsername", result[0].username);
          this.$store.commit("setPermits", result[0].permits);
          this.$emit("changelink", "/sys/admin/index");
        } else {
          iView.Message.warning("账号或者密码错误");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  /* 样式处理 */
}
</style>
