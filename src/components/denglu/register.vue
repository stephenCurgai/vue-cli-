<template>
  <div>
    <van-nav-bar title="注册" left-text right-text="登录" left-arrow @click-right="onClickRight" />
    <div class="oInForm">
      <div>
        <input type="text" name id disabled v-model="form.errmsg" />
      </div>
      <div>
        昵&nbsp;&nbsp;&nbsp;称：
        <input type="text" name id v-model="form.nicheng" @blur="nichengoIn()" />
      </div>
      <div>
        手机号：
        <input type="number" name id v-model="form.phone" @blur="nameoIn()" />
      </div>
      <div>
        密&nbsp;&nbsp;&nbsp;码：
        <input type="text" name id v-model="form.pass" @blur="passoIn()" />
      </div>
      <div class="verification">
        <span>验证码：</span>
        <input type="text" name id v-model="form.yanzheng" />
        <input type="submit" :disabled="flage" class="subBtn" v-model="suboIn" @click="changeoIn()" />
        <!-- <button value="哈哈">点击获取</button> -->
      </div>
      <button class="btn" @click="goNext()">下一步</button>
      <div>
        <input type="checkbox" name id="yuedu" v-model="form.check" />
        <label for="yuedu">我已阅读并同意使用</label>
        <a href="#" target="_blank">条款和隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script>
let Phone = /^1[3456789]\d{9}$/;
let Pass = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){6,32}$/;
export default {
  data() {
    return {
      suboIn: "点击获取",
      miao: 10,
      flage: false,
      hasPassword: "",
      yanoIn: "",
      form: {
        errmsg: "",
        nicheng: "",
        phone: "",
        pass: "",
        yanzheng: "",
        check: false
      }
    };
  },
  methods: {
    onClickRight() {
      this.$router.push("/logon");
    },
    // 倒计时验证码事件
    changeoIn() {
      this.flage = true;
      if (this.form.phone == "") {
        this.form.errmsg = "手机号不要忘O";
      } else if (Phone.test(this.form.phone) == false) {
        this.form.errmsg = "手机号格式错误";
      } else {
        let timer = setInterval(() => {
          this.miao--;
          this.suboIn = this.miao + "s";
          if (this.miao == -1) {
            clearInterval(timer);
            this.suboIn = "重新获取";
            this.miao = 10;
            this.flage = false;
          }
        }, 1000);
        this.$http({
          url: "http://localhost:3000/captcha/sent?phone=" + this.form.phone,
          methed: "get"
        })
          .then(res => {
            console.log(res, "成功");
          })
          .catch(err => {
            console.log(err, "失败");
          });
      }
    },
    // 手机号失焦事件
    nameoIn() {
      // console.log(111);
      if (this.form.phone == "") {
        this.form.errmsg = "手机号不要忘O";
      } else if (Phone.test(this.form.phone) == false) {
        this.form.errmsg = "手机号格式错误";
      } else {
        this.$http({
          url:
            "http://localhost:3000/cellphone/existence/check?phone=" +
            this.form.phone,
          methed: "get"
        })
          .then(res => {
            //  console.log(res, "成功");
            this.hasPassword = res.data.hasPassword;
            //  console.log(this.hasPassword);
            if (res.data.hasPassword == true) {
              this.form.errmsg = "该手机号已注册";
            }
          })
          .catch(err => {
            console.log(err, "失败");
          });
      }
    },
    // 密码失焦事件
    passoIn() {
      // console.log(222);
      if (this.form.pass == "") {
        this.form.errmsg = "密码不要忘O";
      } else if (Pass.test(this.form.pass) == false) {
        this.form.errmsg = "密码格式错误";
      } else {
        this.form.errmsg = "";
      }
    },
    // 昵称失焦事件
    nichengoIn() {
      if (this.form.nicheng == "") {
        this.form.errmsg = "昵称不要忘O";
      }
    },
    // 下一步
    goNext() {
      if (this.form.nicheng == "") {
        this.form.errmsg = "昵称不要忘O";
      } else if (this.form.phone == "") {
        this.form.errmsg = "手机号不要忘O";
      } else if (Phone.test(this.form.phone) == false) {
        this.form.errmsg = "手机号格式错误";
      } else if (this.form.pass == "") {
        this.form.errmsg = "密码不要忘O";
      } else if (Pass.test(this.form.pass) == false) {
        this.form.errmsg = "密码格式错误";
      } else if (this.form.yanzheng == "") {
        this.form.errmsg = "验证码不要忘O";
      } else if (this.form.check != true) {
        console.log(111);
        this.form.errmsg = "阅读条款并同意";
        // 验证码
      } else {
        this.$http({
          url:
            "http://localhost:3000/captcha/verify?phone=" +
            this.form.phone +
            "&captcha=" +
            this.form.yanzheng,
          methed: "get"
        })
          .then(res => {
            console.log(res.statusText, "成功");
            if (res.data.code == 200) {
              console.log("登录成功");
              // 如果验证码对了，注册接口，掉登录
              this.$http({
                url:
                  "http://localhost:3000/register/cellphone?phone=" +
                  this.form.phone +
                  "&password=" +
                  this.form.pass +
                  "&captcha=" +
                  this.form.yanzheng +
                  "&nickname=" +
                  this.form.nicheng,
                methed: "get"
              })
                .then(res => {
                   console.log(res, "成功");
                  //  console.log(this.hasPassword);
                  this.$router.push('/logon')
                })
                .catch(err => {
                  console.log(err, "失败");
                });
            }
          })
          .catch(err => {
            console.log(err, "失败");
            this.form.errmsg = "验证码错误";
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
.oInForm div:nth-child(1) input {
  color: red;
  background: #fff;
}
.oInForm p {
  line-height: 0.99rem;
  text-align: right;
  padding: 0 0.2rem;
}
.oInForm p a {
  color: #b8b8b8;
}
.oInForm .btn {
  width: 6rem;
  height: 1rem;
  border: none;
  outline: none;
  background: #ff9900;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.34rem;
  margin-top: 0.49rem;
}
.verification {
  display: flex;
  justify-content: space-between;
}

.subBtn {
  display: inline-block;
  width: 1.3rem;
  height: 1.31rem;
  border: none;
  outline: none;
  font-size: 0.28rem;
  color: red;
  padding: 0;
  background: #fff;
}
</style>
