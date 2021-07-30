<!--图书目录界面-->
<template>
  <div>
    <template >
      <div class="tb">
        <el-input style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          placeholder="输入关键字搜索" v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="find">查找</el-button><el-button slot="append" @click="addbook1">添加</el-button>
        </el-input>
      </div>
    </template>
<el-table border
  :data="userdate"
  style="width: 85%">
  <el-table-column
    label="图书序号"
    prop="book_id" align="center">
  </el-table-column>
  <el-table-column
        prop="img"
        header-align="center"
        align="center"
        label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 80px"
            :src="scope.row.img"
            :preview-src-list="[scope.row.img]"></el-image>
        </template>
      </el-table-column>
  <el-table-column
    label="书名"
    prop="name" align="center">
  </el-table-column>
  <el-table-column
    label="类型"
    prop="type" align="center">
  </el-table-column>
  <el-table-column
    label="简介"
    prop="content" align="center">
  </el-table-column>
  <el-table-column
    label="位置"
    prop="location" align="center">
  </el-table-column>
  <el-table-column
    label="现藏书量"
    prop="book_num_now" align="center">
  </el-table-column>
  <el-table-column
    label="总藏书量"
    prop="book_num_all" align="center">
  </el-table-column>
  <el-table-column
    align="center" label="操作" >
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)" type="primary" plain round>编辑</el-button>
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
    <el-dialog title="修改图书信息" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="图书序号" :label-width="formLabelWidth">
          <el-input v-model="book.book_id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="book.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="book.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="book.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" :label-width="formLabelWidth">
           <el-input v-model="book.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现藏书量" :label-width="formLabelWidth">
           <el-input v-model="book.book_num_now" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总藏书量" :label-width="formLabelWidth">
           <el-input v-model="book.book_num_all" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="img">
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
        <el-button type="primary" @click="upBook">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!----->
    <el-dialog title="添加图书" :visible.sync="dialogTableVisible2" width="30%">
      <el-form :model="user">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="book.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="book.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
           <el-input v-model="book.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" :label-width="formLabelWidth">
           <el-input v-model="book.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总藏书量" :label-width="formLabelWidth">
           <el-input v-model="book.book_num_all" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="imageUrl">
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
        <el-button type="primary" @click="addBook">确 定</el-button>
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
      book: {
        book_id: 0,
        name: '',
        content: '',
        type: '',
        book_num_now: 0,
        img: '',
        book_num_all: 0,
        location: ''
      },
      imageUrl: '',
      search: '',
      list: [],
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      pageSize: 5,
      formLabelWidth: '80px',
      userdate: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllBook', {}).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.craetep()
          // console.log(this.list)
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
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
      this.book.book_id = row.book_id
      this.book.name = row.name
      this.book.content = row.content
      this.book.type = row.type
      this.book.book_num_now = row.book_num_now
      this.book.img = row.img
      this.book.book_num_all = row.book_num_all
      this.book.location = row.location
      this.imageUrl = row.img
      // console.log(index, row)
    },
    find () {
      console.log(this.search)
      this.currentPage1 = 1
      postRequest('api/public/searchBook', {
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
    },
    upBook () {
      let upbook = {
        book_id: this.book.book_id,
        name: this.book.name,
        content: this.book.content,
        type: this.book.type,
        book_num_now: this.book.book_num_now,
        img: this.book.img,
        book_num_all: this.book.book_num_all,
        location: this.book.location
      }
      postRequest('/api/public/upBook/', upbook).then((result) => {
        console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
          this.fetchData()
        } else if (result.data.code === -1) {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
      // this.$message({
      //   message: '修改了！',
      //   type: 'success'
      // })
    },
    handleDelete (index, row) {
      postRequest('/api/public/delBook/', {del: row.book_id}).then((result) => {
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
    },
    addbook1 () {
      this.dialogTableVisible2 = true
      this.book.book_id = 0
      this.book.name = ''
      this.book.type = ''
      this.book.content = ''
      this.book.book_num_now = 0
      this.book.img = ''
      this.book.book_num_all = 0
      this.book.location = ''
    },
    addBook () {
      if (this.book.name !== '' && this.book.type !== '' && this.book.content !== '' && this.book.book_num_all !== 0 && this.book.img !== '') {
        this.dialogTableVisible2 = false
        let addbook = {
          book_id: this.book.book_id,
          name: this.book.name,
          content: this.book.content,
          type: this.book.type,
          book_num_now: this.book.book_num_all,
          img: this.book.img,
          book_num_all: this.book.book_num_all,
          location: this.book.location
        }
        postRequest('/api/public/addBook', addbook).then((result) => {
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
      this.book.img = img
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
