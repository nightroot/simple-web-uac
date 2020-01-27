<template>
  <div id="login">
    <h1>{{ result }}</h1>
    <div>
      <p>账号：<input
          type="text"
          name="usercode"
          size="10"
          ref="usercode"
        ></p>
      <p>密码：<input
          type="password"
          name="password"
          size="10"
          ref="password"
        ></p>
      <p><button @click="login">确定</button></p>
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
  created:function(){//加载函数
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
        if (result.islogin === "1") {
          // iView.Message.success("登录成功");
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
