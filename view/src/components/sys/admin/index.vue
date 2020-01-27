<style scoped>
.layout {
  border: 0px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
  width: 100%;
  height: 100%;
}
/* .layout-logo {
  width:200px;
  height: 64px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 0;
  left: 0;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
} */
.logo-nav {
  width: 200px;
  height: 64px;
  padding: 8px;
  color: white;
  font-size: 150%;
  display: flex;
  align-items: flex-end;
}
.logo-detail {
  width: 48px;
  height: 48px;
}
</style><template>
  <div class="layout">
    <Layout style="  width: 100%;  height: 100%;">
      <!-- <img src="@/assets/bg.jpg" alt=""> -->
      <Sider style="  width: 100%;  height: 100%;" hide-trigger :style="{background: '#515a6e'}">
        <!-- <Menu
          @on-select="menuSelect"
          accordion
          active-name="index"
          theme="dark"
          width="auto"
          :open-names="['index']"
        >
          <div class="logo-nav">
            <div style="width:48px">
              <img src="@/assets/img/supply.png" width="48" height="48" align="left" alt />
            </div>
            <div style="position: absolute; top: 15px;left:60px;">后台管理系统</div>
          </div>
          <MenuItem name="index">首页</MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>Item 1
            </template>
            <Submenu name="1-1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>Item 1
            </template>
              <MenuItem name="1-1-1">Option 2</MenuItem>
              <MenuItem name="1-1-2">Option 3</MenuItem>
            </Submenu>
            <MenuItem name="1-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>-->
        <Menu @on-select="menuSelect" accordion active-name="index" theme="dark" width="auto">
          <div class="logo-nav">
            <div style="width:48px">
              <img src="@/assets/img/supply.png" width="48" height="48" align="left" alt />
            </div>
            <div style="position: absolute; top: 15px;left:60px;">后台管理系统</div>
          </div>
          <MenuItem name="index">首页</MenuItem>
          <Submenu v-for="menu in createmenu()" :key="menu.code" :name="menu.code">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{menu.title}}
            </template>
            <MenuItem
              v-for="item in menu.children"
              :key="item.code"
              :name="item.code"
            >{{item.title}}</MenuItem>
          </Submenu>
          <!-- <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>Item 1
            </template>
            <Submenu name="1-1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>Item 1
            </template>
              <MenuItem name="1-1-1">Option 2</MenuItem>
              <MenuItem name="1-1-2">Option 3</MenuItem>
            </Submenu>
            <MenuItem name="1-2">Option 2</MenuItem>
          </Submenu>-->
        </Menu>
      </Sider>
      <Layout>
        <Header style="padding:0">
          <!-- 头像 -->
          <Menu mode="horizontal" theme="light" active-name="1" style="height:64px">
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>Item 1
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>Item 2
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>Item 3
              </MenuItem>
              <MenuItem name="4">
                <Icon type="ios-paper"></Icon>Item 4
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>
          <tabCom ref="tab">12342134</tabCom>
        </Layout>
      </Layout>
      <!-- <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
      </Layout>-->
    </Layout>
  </div>
</template>
<script>
import tabCom from "./tab.vue";
import post from "@/axios/requests";
export default {
  components: { tabCom },
  data() {
    return {
      title: "后台登录",
      //   result: "示例数据",// 返回
      // isCollapsed: false // 设为true后在左侧菜单会隐藏
      menus: []
    };
  },
  created: function() {//加载函数
    //更改title
    this.$emit("changetitle", this.title);
    //请求菜单数据
    post("/sys/demo/menu", "").then(result => {
      this.menus = result;
    });
  },
  methods: {
    //创建菜单
    createmenu: function() {
      let tmp = [];
      let tmpdata=this.menus
      this.menus.forEach(item=>{
        if(item.parent=='-1'){
          item.children=[]
          tmp.push(item)
          this.menus.forEach(child=>{
            if(child.parent==item.id){
              item.children.push(child)
            }
          })
        }
      })
      // console.log(tmp)
      return tmp;
    },
    menuSelect: function(name) {
      //菜单单击事件
      let onmenu=this.menus.filter(v=>v.code==name)[0]
      // console.log(onmenu)
      // console.log(onmenu.code,onmenu.title)
      // this.$refs.tab.addtabname = onmenu.title;
      // this.$refs.tab.addtabcode = onmenu.code;
      this.$refs.tab.addtab=onmenu
    }
  }
};
</script>

