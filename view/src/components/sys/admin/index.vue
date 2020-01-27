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
      <Sider style="  width: 100%;  height: 100%;" hide-trigger :style="{background: '#515a6e'}">
        <Menu @on-select="menuSelect" accordion active-name="index" theme="dark" width="auto">
          <div class="logo-nav">
            <div style="width:48px">
              <img src="@/assets/img/supply.png" width="48" height="48" align="left" alt />
            </div>
            <div style="position: absolute; top: 15px;left:60px;">后台管理系统</div>
          </div>
          <!-- <MenuItem name="sysadminhome" key="sysadminhome">首页</MenuItem> -->
          <MenuItem
            v-for="topmenu in createtopmenu()"
            :name="topmenu.code"
            :key="topmenu.code"
          >{{topmenu.title}}</MenuItem>
          <Submenu v-for="menu in createmenu()" :key="menu.code" :name="menu.code">
            <template slot="title">
              <Icon :type="menu.icon"></Icon>
              {{menu.title}}
            </template>
            <MenuItem
              v-for="item in menu.children"
              :key="item.code"
              :name="item.code"
            >{{item.title}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style="padding:0;Display:inline-block">
          <Menu mode="horizontal" theme="light" active-name="1" style="height:64px">
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>系统一
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>系统二
              </MenuItem>
              <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>系统三
              </MenuItem>
              <MenuItem name="4" style="float:right">
              <!-- 头像 -->
                <Avatar style="background-color: #87d068" icon="ios-person" size="large" />
                <Dropdown trigger="click" @on-click="avatarmenu">
                  <a href="javascript:void(0)">
                    {{this.$store.state.user.username}}
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="person">个人资料</DropdownItem>
                    <DropdownItem name="password">修改密码</DropdownItem>
                    <DropdownItem name="logout">登出系统</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>
          <keep-alive>
            <tabCom ref="tab"></tabCom>
          </keep-alive>
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
import iView from "iview";
export default {
  name: "Index",
  components: { tabCom },
  data() {
    return {
      title: "后台登录",
      avatar: "",
      menus: []
    };
  },
  mounted: function() {
    //更改title
    this.$emit("changetitle", this.title);
    //请求菜单数据
    post("/sys/demo/menu").then(result => {
      this.menus = result;
    });
    this.avatar = require("@/assets/img/avatar/admin.jpg").default;
  },
  methods: {
    //创建菜单
    createmenu: function() {
      let tmp = [];
      let tmpdata = this.menus;
      this.menus.forEach(item => {
        if (item.parent == "-1") {
          item.children = [];
          tmp.push(item);
          this.menus.forEach(child => {
            if (child.parent == item.id) {
              item.children.push(child);
            }
          });
        }
      });
      return tmp.filter(item => item.children.length > 0);
    },
    createtopmenu: function() {
      let tmp = [];
      let tmpdata = this.menus;
      this.menus.forEach(item => {
        if (item.parent == "-1") {
          item.children = [];
          tmp.push(item);
          this.menus.forEach(child => {
            if (child.parent == item.id) {
              item.children.push(child);
            }
          });
        }
      });
      return tmp.filter(item => item.children.length == 0);
    },
    menuSelect: function(name) {
      //菜单单击事件
      let onmenu = this.menus.filter(v => v.code == name)[0];
      this.$refs.tab.addtab = onmenu;
    },
    avatarmenu:function(type){
      switch(type) {
        case "person":
            console.log(type)
            break;
        case "password":
            console.log(type)
            break;
        case "logout":
            console.log(type)
            break;
        default:
            iView.Message.warning("调用失败");
} 
    }
  }
};
</script>

