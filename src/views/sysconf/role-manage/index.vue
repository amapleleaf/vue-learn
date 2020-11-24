<template>
  <div class="user-container">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="searchForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="可用状态">
        <el-select v-model="searchForm.available" placeholder="账号状态">
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div  class="tools-bar">
      <el-button type="primary"  icon="el-icon-plus" size="mini" @click="handleAdd()">新增用户</el-button>
    </div>
    <el-table
            :data="tableData"
            stripe
            style="width: 100%">
      <el-table-column
              prop="roleId"
              label="角色编号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="roleName"
              label="角色名称"
              width="180">
      </el-table-column>
      <el-table-column
              label="可用状态">
        <template slot-scope="scope">
         <!-- {{scope.row.locked==0 ? '正常': '锁定'}}-->
          <el-tag v-if="scope.row.available==1" type="success" effect="plain">可用</el-tag>
          <el-tag v-else type="danger" effect="plain">禁用</el-tag>
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
    <el-dialog :title="editDataFlag?'修改角色信息':'新增角色'" :visible.sync="editDialogVisible" width="460px" @close="editDialogClose()">
      <el-form ref="editFormRef" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item v-if="editDataFlag" label="角色编号" prop="userAccount">
            <span style="padding: 0 15px">
              {{editForm.roleId}}
            </span>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="可用状态" prop="available">
          <el-select v-model="editForm.available" placeholder="可用状态">
            <el-option label="可用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" plain @click="editDialogSubmit()" v-if="editDataFlag">保存</el-button>
        <el-button type="primary" plain @click="editDialogSubmit()" v-else>立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {querySysRoleList} from '@/api/userapi'
  export default {
    name:"UserManage",
    data() {
      return {
        pageSize: 10,
        totalRecord: 0,
        pageNum:1,
        editDialogVisible:false,
        editDataFlag:true,
        searchForm: {
          roleName: '',
          available:''
        },
        editForm: {
          roleId: '',
          roleName: '',
          available:''
        },
        tableData: [
          {roleId:1,roleName: '角色1',available: '1'}
        ],
        rules: {
          roleName: [
            {
              required: true,
              message: '请填写角色名称',
              trigger: 'blur'
            }
          ],
          available: [
            {
              required: true,
              message: '请选择状态',
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
        const data = await querySysRoleList();
        this.tableData = data.list || [];
        this.totalRecord = data.total;
        //debugger;
      },
      searchSubmit(param={ pageNum:1 ,pageSize:this.pageSize}){
        Object.assign(param, this.searchForm);
        querySysRoleList(param).then(data => {
          this.tableData = data.list || [];
          this.totalRecord = data.total;
        });
      },
      handleAdd(){
        this.editDataFlag=false
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
        this.editDataFlag=true;
        this.editDialogVisible = true;
        for (let x of Object.keys(this.editForm)) {
            this.editForm[x] = row[x];
        }
      },
      editDialogSubmit() {
        let _this = this;
        this.$refs["editFormRef"].validate((valid) => {
            if (valid) {
              if(this.editDataFlag){
                this.$message({
                  showClose: true,
                  message: '暂不支持修改角色信息',
                  type: 'warning',
                  duration:5000,
                  showClose:true
                });
                _this.editDialogClose();
                _this.editDialogVisible=false;
              }else {
                saveSysUser(this.editForm).then(data => {
                  this.$message({
                    showClose: true,
                    message: '角色添加成功',
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
        for (let x of Object.keys(this.editForm)) {
          this.editForm[x] ='';
        }
        this.$refs.editFormRef.resetFields();
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