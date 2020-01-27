<template>
  <Tabs type="card" closable @on-tab-remove="handleTabRemove" v-model="currenttab">
    <TabPane
      v-for="tab in tabs"
      :key="tab.code"
      :label="tab.title"
      :name="tab.code"
      :show="addone"
    >{{ tab.title }}</TabPane>
    <!-- <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button> -->
  </Tabs>
</template>
<script>
export default {
  data() {
    return {
      currenttab: "", //当前激活tab
      // addtabcode: "", //更新添加的tabcode
      // addtabname: "", //更新tabname
      addtab: [], //更新tab
      tabs: []
    };
  },
  computed: {
    addone: function() {
      // 添加tab 成功返回true，失败返回false
      let tmptab = this.addtab;
      this.addtab = [];
      this.currenttab = tmptab.code;
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
  methods: {
    handleTabRemove(code) {
      //tab关闭事件
      // debugger;
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].code == code) {
          this.tabs.splice(i, 1);
          // this.currenttab=this.tabs[0].code
        }
      }
    }
  }
};
</script>
