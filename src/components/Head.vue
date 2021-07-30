<!--界面头部-->
<!--suppress ALL -->
<template>
  <el-header style="text-align: right; font-size: 12px;margin-top: 0px ">
    <div class="image"><img src="../../static/image/library.png" height="65px" width="250px" style=" z-index:99; float: left"/></div>
    <el-dropdown >
      <div style="font-size:200%">
      <i class="el-icon-setting"  style="margin-right: 15px; color: rgb(250, 246, 246); "></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="out">退出登录</a></el-dropdown-item>
        <el-dropdown-item><a href="https://github.com/CYT1694458081/library" style="text-decoration:none">后端GIT地址</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="font-size:25px; color: rgb(250, 246, 246)">{{name}}</span>
    <img src="../../static/image/CYT.png" height="60px" width="200px" style="float: right"/>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      name: JSON.parse(window.localStorage.getItem('user')).name
    }
  },
  methods: {
    out () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .el-header {
    position: absolute;
    right: 0px;
    margin-left: 0px;
    width: 100vw;
    background-color:#4169E1;
    color: #333;
    line-height: 60px;
    height: 60px;
    box-shadow: 0px 0px 10px rgb(135,206,250);
  }
</style>
