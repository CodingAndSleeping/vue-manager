<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :key="tag.path" v-for="tag in tags" :to="{path:tag.path}">{{tag.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImage" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';
import userImage from "@/assets/images/user.png";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImage,
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    loginOut(){
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push({name:"login"})
    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabList
    })
  }
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;

}
.el-icon-arrow-down {
  font-size: 12px;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

}


.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }

}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}

</style>