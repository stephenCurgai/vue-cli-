<template>
  <div>
    <van-nav-bar title="登录" left-text right-text="注册" left-arrow @click-right="onClickRight" />
    <div class="oInForm">
      <div class="oInFormP">
        <input type="text" name id disabled v-model="form.errmsg" />
      </div>
      <div>
        手机号：
        <input type="number" name id v-model="form.phone" @blur="nameoIn()" />
      </div>
      <div>
        密&nbsp;&nbsp;&nbsp;码：
        <input type="text" name id v-model="form.pass" @blur="passoIn()" />
      </div>
      <p>
        <a href="#" target="_blank">忘记密码</a>
      </p>
      <button @click="goIndex()">登录</button>
    </div>
  </div>
</template>

<script>
let Phone = /^1[3456789]\d{9}$/;
let Pass = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,32}$/;
export default {
  data() {
    return {
      form: {
        errmsg: "",
        phone: "",
        pass: ""
      }
    };
  },
  methods: {
    onClickRight() {
      this.$router.push("/register");
    },
    nameoIn() {
      // console.log(111);
      if (Phone.test(this.form.phone) == false) {
        this.form.errmsg = "手机号格式错误";
      } else {
        this.form.errmsg = "";
      }
    },
    passoIn() {
      // console.log(222);
      if (Pass.test(this.form.pass) == false) {
        this.form.errmsg = "密码格式错误";
      } else {
        this.form.errmsg = "";
      }
    },
    goIndex() {
      if (
        Phone.test(this.form.phone) == true &&
        Pass.test(this.form.pass) == true
      ) {
        this.$http({
          url: "http://localhost:3000/login/cellphone?"+'phone='+this.form.phone +'&password='+this.form.pass,
          methed: "get"
        })
        .then(res => {
           console.log(res, "成功");
           console.log(res.data.profile);
           if(res.data.code == 200){
             sessionStorage.setItem("name", res.data.profile.nickname);
             sessionStorage.setItem("avatarUrl", res.data.profile.avatarUrl);
             this.$router.push('/index')
           }
        })
        .catch(err => {
          console.log(err,"失败");
          console.log(err.code);
          this.form.errmsg = "账号或密码错误";
        });
      }
    }
  }
};
</script>

<style scoped>
.van-nav-bar {
  background: #ff9900;
  color: #fff;
  height: 0.94rem;
}
.van-nav-bar__title {
  color: #fff;
  font-size: 0.34rem;
}
.van-icon-arrow-left {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
  font-size: 0.34rem;
}
.oInForm {
  margin: 0 auto;
  width: 6rem;
  margin-top: 1.9rem;
}
.oInForm div {
  width: 6rem;
  height: 1.31rem;
  border-bottom: 1px solid #b8b8b8;
  line-height: 1.31rem;
  color: #b8b8b8;
  font-size: 0.3rem;
}
.oInForm p {
  line-height: 0.99rem;
  text-align: right;
  padding: 0 0.2rem;
}
.oInForm p a {
  color: #b8b8b8;
}
.oInForm button {
  width: 6rem;
  height: 1rem;
  border: none;
  outline: none;
  background: #ff9900;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.34rem;
}
/* .oInForm .oInFormP{
  text-align: center;
  color: red;
} */
.oInFormP input {
  text-align: center;
  background: #fff;
  color: red;
}
</style>
