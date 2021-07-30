<template>
  <div>
    <div class="image"><img src="../../static/image/library.png" height="70px" width="150px" style="float: left"/>
      <img src="../../static/image/CYT.png" height="70px" width="150px" style="float: right"/>
      <h2> 欢迎来到使用本系统 用户：{{name}}</h2>
      </div>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="rgb(16,103,155)"
    text-color="#fff"
    active-text-color="#ffd04b" router>
    <el-menu-item index="home" style=" margin-left: 55vh"><a style="font-size:180%;">首页</a></el-menu-item>
    <el-menu-item index="library" style="font-size:150%;">书库</el-menu-item>
    <el-submenu index="2" >
      <template slot="title" style="font-size:150%;"><a style="font-size:180%; ">我的借还管理</a></template>
      <el-menu-item index="Myborrow" style="display: flex;justify-content:center;"><a style="font-size:150%; ">图书归还</a></el-menu-item>
      <el-menu-item index="Myback"  style="display: flex;justify-content:center;"><a style="font-size:150%; ">归还情况</a></el-menu-item>
    </el-submenu>
    <el-menu-item index="Mydrlist" style="font-size:150%;">我的待缴纳罚单</el-menu-item>
    <el-submenu index="3" >
      <template slot="title" style="font-size:150%;"><a style="font-size:180%; ">我的历史</a></template>
      <el-menu-item index="Myhistory" style="display: flex;justify-content:center;"><a style="font-size:150%; ">借阅历史</a></el-menu-item>
      <el-menu-item index="MyDRHistory"  style="display: flex;justify-content:center;"><a style="font-size:150%; ">罚款历史</a></el-menu-item>
    </el-submenu>
    <el-dropdown style="margin-left: 50vh;margin-top: 20px;color: white; float: right">
      <div style="font-size:200%">
      <i class="el-icon-setting" ></i>
      </div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item><a @click="out">退出登录</a></el-dropdown-item>
        <el-dropdown-item><a href="https://github.com/CYT1694458081/vue-library" style="text-decoration:none">前端GIT地址</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'my',
      activeIndex2: '1',
      name: JSON.parse(window.localStorage.getItem('user')).name
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    out () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.image{
  height: 70px;
  width: auto;
  border: black 3px solid;
  background-color: rgba(106,216,236,50);
}
.el-menu-demo{
  display: flex;
  justify-content:space-around;
}

</style>
