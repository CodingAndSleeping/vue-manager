<template>
  <el-menu
    background-color="#545c64"
    text-color="white"
    active-text-color="#ffd04b"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{isCollapse ? "后台" : "通用后台管理系统"}}</h3>
    <el-menu-item
      :key="item.path"
      v-for="item in noChildren"
      :index="item.path"
      @click="changeMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :key="item.label" v-for="item in hasChildren" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group :key="subItem.path" v-for="subItem in item.children">
        <el-menu-item :index="subItem.path" @click="changeMenu(subItem)">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changeMenu(item){
      if(this.$route.name !== item.name){
        this.$router.push({
        name:item.name
      });
      this.$store.commit("selectMenu", item)
      }
    }
  },

  computed: {
    noChildren() {
      return this.sayncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.sayncMenu.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    },
    sayncMenu(){
      return this.$store.state.tab.menu
    }
  },
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>