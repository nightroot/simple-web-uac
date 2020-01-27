<template>
  <div style="  width: 100%; height: 100%;">
    <keep-alive>
    <component
      @changelink="changelink"
      @changetitle="changetitle"
      :is="comp"
    ></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Dynamic",
  // props: ["0"],//父组件没有参数传入
  data() {
    let system = this.$route.params.system || "",
      moudle = this.$route.params.moudle || "",
      method = this.$route.params.method || "",
      path = "";
    if (system && moudle && method) {
      path = "/" + system + "/" + moudle + "/" + method;
    } else {
      path = "/share/404";
    }
    return {
      params:[],//子组件返回参数
      tourl: path,//跳转url
      title: "动态系统", //监听跳转的title
      compName: this.name //本组件名
    };
  },
  computed: {
    comp: function() {
      let path = this.tourl
      try {
        return require(`@/components${path}`).default;
      } catch (err) {
        return require(`@/components/share/404`).default;
      }
    }
  },
  methods: {
    // 刷新页面 url,title
    changelink: function(tmptourl) {
      this.tourl=tmptourl==null?this.tourl:tmptourl
      this.$router.push({ path: this.tourl }).catch(err => {});
    },
    changetitle:function(tmptitle){
      this.title=tmptitle==null?this.title:tmptitle
      document.title=this.title
    }
    // todo methods
  },
  mounted:function(){
    //动态修改title 值可以从子对象组件取
  }
};
</script>