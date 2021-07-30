<!--用户列表-->
<template>
  <div>
    <template >
      <div class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="find">查找</el-button><el-button slot="append" @click="adduser1">添加</el-button>
        </el-input>
      </div>
    </template>
  <el-table border
    :data="userdate" >
    <el-table-column
      label="ID"
      prop="user_id" align="center" >
    </el-table-column>
    <el-table-column
        prop="img"
        header-align="center"
        align="center"
        label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"></el-image>
        </template>
      </el-table-column>
    <el-table-column
    label="用户名"
    prop="name" align="center" >
  </el-table-column>
    <el-table-column
      label="密码"
      prop="password" align="center">
    </el-table-column>
    <el-table-column
      label="用户类型"
      prop="role" align="center">
    </el-table-column>
    <el-table-column
      label="在借书量"
      prop="borrow_num" align="center">
    </el-table-column>
    <el-table-column
      label="未缴纳罚单量"
      prop="dRecord_num" align="center">
    </el-table-column>
    <el-table-column
      label="注册时间"
      prop="regtime" align="center">
    </el-table-column>
    <el-table-column
      align="center" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="success" plain round>编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" plain round>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1" :current-page="currentPage1">
      </el-pagination>
    </div>
  <!---->
  <el-dialog title="修改用户信息" :visible.sync="dialogTableVisible" width="30%">
    <el-form :model="user">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="user.user_id" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="user.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="在借书量" :label-width="formLabelWidth">
        <el-input v-model="user.borrow_num" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="未缴纳罚单量" :label-width="formLabelWidth">
        <el-input v-model="user.dRecord_num" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" >
        <div>
          <el-radio  v-model="user.role" label="管理员" border :disabled="true">管理员</el-radio>
          <el-radio  v-model="user.role" label="普通用户" border :disabled="true">普通用户</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="头像" prop="img" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="api/public/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="upUser">确 定</el-button>
      <el-button @click="dialogTableVisible = false">取 消</el-button>
    </div>
  </el-dialog>
    <!---->
    <el-dialog title="添加用户" :visible.sync="dialogTableVisible2" width="30%">
      <el-form :model="user">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <div>
            <el-radio  v-model="user.role" label="管理员" border>管理员</el-radio>
            <el-radio  v-model="user.role" label="普通用户" border>普通用户</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="头像" prop="img" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="api/public/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {postRequest} from '../main'

export default {
  data () {
    return {
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      pageSize: 5,
      formLabelWidth: '100px',
      imageUrl: '',
      user: {
        user_id: 0,
        name: '',
        password: '',
        role: '',
        borrow_num: 0,
        img: '',
        dRecord_num: 0
      },
      userdate: [],
      list: [],
      search: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    // 从后台获取所有用户
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllUser', {}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          // console.log(this.list)
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    craetep () {
      this.userdate = []
      let from = (this.currentPage1 - 1) * this.pageSize
      let to = this.currentPage1 * this.pageSize
      for (; from < to; from++) {
        if (this.list[from]) {
          // console.log(this.list[from])
          this.userdate.push(this.list[from])
        }
      }
      this.total = this.list.length
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.user.user_id = row.user_id
      this.user.name = row.name
      this.user.password = row.password
      this.user.borrow_num = row.borrow_num
      this.user.role = row.role
      this.user.img = row.img
      this.imageUrl = row.img
      this.user.dRecord_num = row.dRecord_num
      console.log(index, row)
    },
    find () {
      // console.log(this.search)
      this.currentPage1 = 1
      postRequest('/api/public/searchUser', {
        searchParam: this.search
      }).then((result) => {
        if (result.data.code === 200) {
          this.list = []
          this.list = result.data.data
          this.craetep()
          this.$message(`${result.data.msg}`)
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      postRequest('/api/public/searchUser', {searchParam: this.search}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          // console.log(this.list)
          this.userdate = []
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    upUser () {
      let upuser = {
        user_id: this.user.user_id,
        name: this.user.name,
        password: this.user.password,
        role: this.user.role,
        borrow_num: this.user.borrow_num,
        img: this.user.img,
        dRecord_num: this.user.dRecord_num
      }
      postRequest('/api/public/upUser/', upuser).then((result) => {
        console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
          this.fetchData()
        } else {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
    },
    handleDelete (index, row) {
      if (row.role === '管理员') {
        this.$message.error('权限不够，无法删除')
      } else {
        postRequest('/api/public/delUser/', {del: row.user_id}).then((result) => {
          console.log(result)
          if (result.data.code === 200) {
            this.$message(`${result.data.msg}`)
            this.fetchData()
          } else {
            alert(`${result.data.msg}`)
          }
        }).catch(e => {
          console.log(e)
        })
      }

      console.log(index, row)
    },
    adduser1 () {
      this.dialogTableVisible2 = true
      this.user.user_id = 0
      this.user.name = ''
      this.user.password = ''
      this.user.role = '普通用户'
      this.user.borrow_num = 0
      this.user.img = ''
      this.user.dRecord_num = 0
    },
    addUser () {
      if (this.user.name !== '' && this.user.password !== '' && this.user.img !== '') {
        this.dialogTableVisible2 = false
        let adduser = {
          user_id: this.user.user_id,
          name: this.user.name,
          password: this.user.password,
          role: this.user.role,
          borrow_num: this.user.borrow_num,
          img: this.user.img,
          dRecord_num: this.user.dRecord_num
        }
        postRequest('/api/public/addUser', adduser).then((result) => {
          // console.log(result)
          if (result.data.code === 200) {
            this.$message({
              message: `${result.data.msg}`,
              type: 'success'
            })
            this.fetchData()
          } else {
            alert(`${result.data.msg}`)
          }
        }).catch(e => {
          console.log(e)
        })
        // console.log(this.data)
      } else {
        alert('关键信息不能为空')
      }
    },
    handleSizeChange1: function (pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function (currentPage) {
      this.currentPage1 = currentPage
      this.currentChangePage(this.list, currentPage)
    }, // 分页方法（重点）
    currentChangePage (list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      let to = currentPage * this.pageSize
      this.userdate = []
      for (; from < to; from++) {
        if (list[from]) {
          this.userdate.push(list[from])
        }
      }
    },

    handleAvatarSuccess (res, file) {
      console.log(res)
      var img = res.data
      this.imageUrl = img
      this.user.img = img
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .el-table{
    height: 80vh;
    position: absolute;
    left: 0;
    top: 140px;
    width: 85vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .pagination{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
  .el-dialog{
    width: 120px;
    height: 200px;
  }
  .tb{
    width: 450px;
    position: absolute;
    left: 250px;
    top: 90px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
