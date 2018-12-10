<template>
  <div class="login-wrap">
    <div class="ms-title">{{ msg }}</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
      label-width="0px">
        <div v-if="errorInfo">
          <span>{{ errInfo }}</span>
        </div>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="账号" ></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input type="passwd" placeholder="密码" v-model="ruleForm.passwd"
          @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item  prop="validate">
          <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      msg: '登录',
      errInfo: false,
      ruleForm: {
        name: '',
        passwd: '',
        validate: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'please enter the username!',
            trigger: 'blur',
          },
        ],
        passwd: [
          {
            required: true,
            message: 'please enter the passwd!',
            trigger: 'blur',
          },
        ],
        validate: [
          {
            required: true,
            message: 'please enter the identify code!',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor((Math.random() * (max - min)) + min);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i += 1) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap{
  position: relative;
  width:100%;
  height:100%;
}
.ms-title{
  position: absolute;
  top:50%;
  width:100%;
  margin-top: -230px;
  text-align: center;
  font-size:30px;
  color: #fff;

}
.ms-login{
  position: absolute;
  left:50%;
  top:50%;
  width:300px;
  height:240px;
  margin:-150px 0 0 -190px;
  padding:40px;
  border-radius: 5px;
  background: #fff;
}
.ms-login span {
  color: red;
}
.login-btn{
  text-align: center;
}
.login-btn button{
  width:100%;
  height:36px;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
</style>
