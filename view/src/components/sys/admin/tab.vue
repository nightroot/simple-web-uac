<template>
  <Tabs type="card" closable @on-tab-remove="handleTabRemove" v-model="activetab" :show="addone">
    <TabPane v-for="tab in tabs" :key="tab.code" :label="tab.title" :name="tab.code">
      <keep-alive>
        <component :is="content"></component>
      </keep-alive>
    </TabPane>
  </Tabs>
</template>
<script>
export default {
  name: "TabCom",
  data() {
    return {
      activetab: "", //当前激活tab
      activeurl: "", //当前激活content
      addtab: {}, //更新tab
      tabs: []
    };
  },
  created: function() {},
  mounted: function() {
  },
  computed: {
    addone: function() {
      // 添加tab 成功返回true，失败返回false
      let tmptab = this.addtab;
      if (this.addtab.code != undefined) {
        this.activetab = tmptab.code;
        this.activeurl = tmptab.url;
        this.addtab = {};
        if (
          tmptab.code != "" &&
          tmptab.code != null &&
          JSON.stringify(this.tabs).indexOf(JSON.stringify(tmptab)) === -1
        ) {
          this.tabs.push(tmptab);
          return true;
        } else {
          return false;
        }
      }
    },
    // 内容
    content: function() {
      if (this.activetab == undefined || this.activetab == "") {
        this.activetab = this.tabs[0].code;
        this.activeurl = this.tabs[0].url;
      } else {
        this.activeurl = this.tabs.filter(v => v.code == this.activetab)[0].url;
      }
      try {
        return require(`@/components${this.activeurl}`).default;
      } catch (err) {
        return require(`@/components/share/404`).default;
      }
    }
  },
  methods: {
    handleTabRemove(code) {
      //tab关闭事件
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].code == code) {
          this.tabs.splice(i, 1);
          if (i > 0 && this.activetab == code) {
            console.log("zhixing");
            this.activetab = this.tabs[i - 1].code;
            this.activeurl = this.tabs[i - 1].url;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
</style>