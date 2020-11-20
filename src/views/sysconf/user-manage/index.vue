<template>
  <div class="user-container">
    <el-form :inline="true" :model="searchUser" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="searchUser.userAccount" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchUser.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select v-model="searchUser.locked" placeholder="账号状态">
          <el-option label="正常" value="0"></el-option>
          <el-option label="锁定" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div  class="tools-bar">
      <el-button type="primary"  icon="el-icon-plus" size="mini" @click="handleAddSysUser()">新增用户</el-button>
    </div>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
      <el-table-column
              prop="userAccount"
              label="账号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="userName"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              label="账号状态">
        <template slot-scope="scope">
         <!-- {{scope.row.locked==0 ? '正常': '锁定'}}-->
          <el-tag v-if="scope.row.locked==0" type="success" effect="plain">正常</el-tag>
          <el-tag v-else type="danger" effect="plain">锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column
              label="操作"
              fixed="right"
              width="170">
        <template slot-scope="scope">
          <div>
            <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
                    type="text"
                    size="small"
                    @click="handleResetPwd(scope.$index, scope.row)"
            >重置密码</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-bar">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page.sync="pageNum"
              layout="total,prev, pager, next, jumper"
              :total="totalRecord">
      </el-pagination>
    </div>
    <el-dialog :title="editUserFlag?'修改用户信息':'新增用户'" :visible.sync="editDialogVisible" width="460px" @close="editDialogClose()">
      <el-form ref="editUserForm" :rules="rules" :model="dataForm" label-width="80px">
        <input name="userId" type="hidden" v-model="dataForm.userId"  />
        <el-form-item label="账号" prop="userAccount">
          <template v-if="editUserFlag">{{dataForm.userAccount}}</template>
          <el-input v-else v-model="dataForm.userAccount" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="dataForm.userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item v-if="!editUserFlag" label="密码" prop="password">
          <el-input type="password" v-model="dataForm.password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="locked">
          <el-select v-model="dataForm.locked" placeholder="账号状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="锁定" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" plain @click="editDialogSubmit()" v-if="editUserFlag">保存</el-button>
        <el-button type="primary" plain @click="editDialogSubmit()" v-else>立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {querySysUserList,saveSysUser} from '@/api/userapi'
  export default {
    name:"UserManage",
    data() {
      return {
        pageSize: 10,
        totalRecord: 0,
        pageNum:1,
        editDialogVisible:false,
        editUserFlag:true,
        searchUser: {
          userAccount: '',
          userName: '',
          locked:''
        },
        dataForm: {
          userId: '',
          userAccount: '',
          userName: '',
          password:'',
          locked:''
        },
        tableData: [
          {userAccount: 'admin1',userName: '王小虎1',locked: '0'},
          {userAccount: 'admin2',userName: '王小虎2',locked: '1'},
          {userAccount: 'admin3',userName: '王小虎3',locked: '0'},
          {userAccount: 'admin4',userName: '王小虎4',locked: '1'}
        ],
        rules: {
          userAccount: [
            {
              required: true,
              message: '请填写账号',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 50,
              message: '登录名长度在 1 到 50 个字符',
              trigger: 'blur'
            }
          ],
          userName: [
            {
              required: true,
              message: '请填写姓名',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '真实姓名长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '密码长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          locked: [
            {
              required: true,
              message: '请选择账号状态',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      this.initPageData();
    },
    methods:{
      async initPageData(){
        const data = await querySysUserList();
        this.tableData = data.list || [];
        this.totalRecord = data.total;
        //debugger;
      },
      searchSubmit(param={ pageNum:1 ,pageSize:this.pageSize}){
        Object.assign(param, this.searchUser);
        querySysUserList(param).then(data => {
          this.tableData = data.list || [];
          this.totalRecord = data.total;
        });
      },
      handleAddSysUser(){
        this.editUserFlag=false
        this.editDialogVisible = true;
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.searchSubmit({ pageNum: this.pageNum });
      },
      handleCurrentChange(val) {
        this.searchSubmit({ pageNum: val });
      },
      handleEdit(index, row) {
        this.editUserFlag=true;
        this.editDialogVisible = true;
        for (let x of Object.keys(this.dataForm)) {
            this.dataForm[x] = row[x];
        }
      },
      editDialogSubmit() {
        let _this = this;
        this.$refs["editUserForm"].validate((valid) => {
            if (valid) {
              if(this.editUserFlag){
                this.$message({
                  showClose: true,
                  message: '暂不支持修改用户信息',
                  type: 'warning',
                  duration:5000,
                  showClose:true
                });
                _this.editDialogClose();
                _this.editDialogVisible=false;
              }else {
                saveSysUser(this.dataForm).then(data => {
                  this.$message({
                    showClose: true,
                    message: '用户添加成功',
                    type: 'success'
                  });
                  _this.editDialogClose();
                  _this.editDialogVisible=false;
                })
              }
        } else {
            return false;
        }});

      },
      editDialogClose() {
        for (let x of Object.keys(this.dataForm)) {
          this.dataForm[x] ='';
        }
        this.$refs.editUserForm.resetFields();
      },
      handleResetPwd(){
        this.$message({
          showClose: true,
          message: '暂不支持重置密码',
          type: 'warning',
          duration:5000,
          showClose:true
        });
      }
    }

  }
</script>
<style >
  .user-container {
    padding: 5px;
  }
  .tools-bar{
    margin-bottom:20px;
  }
</style>