<!--侧边栏-->
<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['2', '3']" :default-active="onRoutes" :collapse="collapse"  background-color="rgb(135,206,250)" text-color="#fff" active-text-color="#1E90FF" router>
      <el-menu-item index="my"><i class="el-icon-menu"></i>基本信息</el-menu-item >
      <el-menu-item index="handbook"><i class="el-icon-reading"></i>图书管理</el-menu-item >
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="user">用户信息</el-menu-item>
          <el-menu-item index="userlog">用户记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="borrowlog"><i class="el-icon-tickets"></i>借阅记录</el-menu-item >
      <el-menu-item index="defaultrecord"><i class="el-icon-document"></i>罚款记录</el-menu-item >
      <el-menu-item><i class="el-icon-more"></i><a @click="add" style="text-decoration:none; color: #f3f4f2">更多操作</a></el-menu-item>
    </el-menu>
    </el-aside>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    add () {
      alert('敬请期待！')
    }
  }
}
</script>

<style scoped>
  .el-aside{
    position: absolute;
    left: 0px;
    margin-top: 60px;
    box-shadow: 0px 0px 10px #07ecec;
    z-index:-1;
  }
  .el-menu{
    margin-left: 0px;
    height: 92vh
  }

</style>
