<!--管理员主页-->
<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="user.img" class="user-avator" alt="">
            <div class="user-info-cont">
              <div class="user-info-name">{{user.name}}</div>
              <div>{{user.role}}</div>
              </div><el-button slot="append" icon="el-icon-setting"  type="primary" plain @click="dialogTableVisible=true">修改信息</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" >

      </el-col>
    </el-row>
    <img src="../../static/image/background.jpg" style="z-index:-2; position: absolute; top:0vh; left: 0vw;width: 100%;height:100%"/>
    <el-dialog title="修改个人信息" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="user.user_id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="img" label-width="formLabelWidth">
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
        <el-button type="primary" @click="up">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      user: {
        user_id: JSON.parse(window.localStorage.getItem('user')).user_id,
        name: '',
        password: '',
        role: '',
        borrow_num: 0,
        img: '',
        dRecord_num: 0
      },
      dialogTableVisible: false,
      formLabelWidth: '80px',
      imageUrl: ''
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    getuser () {
      postRequest('/api/public/getUserById', {
        id: JSON.parse(window.localStorage.getItem('user')).user_id
      }).then((result) => {
        if (result.data.code === 200) {
          this.user = result.data.data
          this.imageUrl = result.data.data.img
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
      })
    },
    up () {
      let upuser = {
        user_id: this.user.user_id,
        name: this.user.name,
        password: this.user.password,
        role: this.user.role,
        borrow_num: this.user.borrow_num,
        img: this.imageUrl,
        dRecord_num: this.user.dRecord_num
      }
      postRequest('/api/public/upUser/', upuser).then((result) => {
        // console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
          this.getuser()
        } else {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      var img = res.data
      this.imageUrl = img
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
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    height: 50vh;
    position: absolute;
    left: 0;
    top: 140px;
    width: 35vw;
    margin-left: 550px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb21{
    height: 50vh;
    position: absolute;
    right: 5vw;
    top: 140px;
    width: 35vw;
    margin-right: 40px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb22{
    /*height: 80vh;*/
    position: absolute;
    right: 10vw;
    top:220px;
    width: 65vw;
    margin-right:20vw;
    margin-top: 30vh;
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
