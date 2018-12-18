<template>
  <div class="user">
    <!-- 头部面包屑 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>成员管理</el-breadcrumb-item>
          <el-breadcrumb-item>成员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="24">
        <!-- 给组件绑定原生事件的话，需要绑定.native修饰符 -->
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList">
          <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
        </el-input>
        <el-button type="success" plain @click="addDialogFormVisible=true">添加成员</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
      <el-table :data="username" class="m-20" border style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="成员">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="change(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="getUser(scope.row)"></el-button>
            <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="showDeleteUser(scope.row)"></el-button>
            <el-button size="mini" type="warning" plain icon="el-icon-check" @click="showGrantDialog(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[3, 6, 9, 12]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加成员 -->
    <el-dialog title="添加成员" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
        <el-form-item label="成员名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改成员 -->
    <el-dialog title="修改成员" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" label-width="80px" :rules="rules" ref="editUserForm">
        <el-form-item label="成员名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <el-form :model="grantForm" label-width="120px">
        <el-form-item label="当前成员：" prop="username">
          <el-tag type="info">{{grantForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="请选择角色：">
          <el-select v-model="roleId" placeholder="请选择角色">
            <el-option :label="role.roleName" :value="role.id" v-for="(role, index) in rolelist" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUserSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getUserList,
//   changeUserState,
//   addUser,
//   getUserById,
//   editUser,
//   deleteUser,
//   getRoleList,
//   grantUserRole
// } from "@/api";
export default {
  data() {
    return {
      loading:true,
      username: [],
      query: "",
      pagesize: 3,
      pagenum: 1,
      total: 0,
      addDialogFormVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editDialogFormVisible: false,
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: 0
      },
      grantDialogFormVisible: false,
      grantForm: {},
      rolelist: [],
      roleId: "",
      rules: {
        username: [
          { required: true, message: "请输入成员名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        mobile: [{ required: true, message: "电话不能为空" }]
      }
    };
  },
  created() {
    this.initList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initList();
    },
    //初始化表格数据
    initList() {
       this.loading = true
      getUserList({
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        this.username = res.data.users;
        this.total = res.data.total;
        this.loading = false
      })
    },
    //改变成员状态
    change(row) {
      changeUserState({ uid: row.id, type: row.mg_state }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: "success",
            message: "修改成员状态成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.meta.msg
          });
        }
      });
    },
    //添加成员
    addUserSubmit(formName) {
      console.log(formName);
      this.$refs[formName].validate(valide => {
        if (valide) {
          addUser(this.addForm).then(res => {
            if (res.meta.status === 201) {
              this.$message({
                type: "success",
                message: "创建成功"
              });
            }
            this.addDialogFormVisible = false;
            this.initList();
          });
        }
      });
    },
    //编辑成员
    getUser(row) {
      this.editDialogFormVisible = true;
      getUserById(row.id).then(res => {
        if (res.meta.status === 200) {
          this.editForm.username = res.data.username;
          this.editForm.email = res.data.email;
          this.editForm.mobile = res.data.mobile;
          this.editForm.id = res.data.id;
        }
      });
    },
    //修改成员
    editUserSubmit(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          editUser(this.editForm).then(res => {
            console.log(res);
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "编辑成功"
              });
            }
            this.editDialogFormVisible = false;
            this.initList();
          });
        }
      });
    },
    //显示删除对话框
    showDeleteUser(row) {
      this.$confirm("此操作将永久删除该成员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //执行删除成员操作
          deleteUser(row.id).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //显示分配角色对话框
    showGrantDialog(row) {
      this.grantForm = row;
      this.grantDialogFormVisible = true;
      getRoleList().then(res => {
        if (res.meta.status === 200) {
          this.rolelist = res.data;
        }
      });
    },
    //分配角色
    grantUserSubmit() {
      if (!this.roleId) {
        this.$message({
          type: "warning",
          message: "角色不能为空，请选择！"
        });
      } else {
        grantUserRole({ id: this.grantForm.id, rid: this.roleId }).then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: "success",
              message: "设置角色成功"
            });
            this.grantDialogFormVisible = false;
          } else {
            this.$message({
              type: "error",
              message: res.meta.msg
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.user .m-20 {
  margin: 20px 0;
}
.user .search-input {
  width: 300px;
}
.user .page {
  padding: 5px 0;
  background-color: #d3dce6;
}
</style>
