<template>
  <div class="Body">
    <van-nav-bar title="个人中心" left-text left-arrow>
      <van-icon name="comment-o" slot="right" />
      <van-icon name="setting-o" slot="left" @click="tuichu()" />
    </van-nav-bar>
    <!-- 头像和收藏部分 -->
    <div class="mine">
      <!-- 头像 -->
      <div class="mineHeader">
        <img :src="avatarUrl" alt v-if="!flage" />
      </div>
      <!-- 点击登录 -->
      <div class="clickLogon">
        <p @click="goLogon()" v-if="flage">点击登录</p>
        <p v-if="!flage">{{name}}</p>
      </div>
      <!-- 我的收藏 -->
      <div class="mineKeep">
        <span>
          <img src="../../assets/images/keep.png" alt />
        </span>
        <span>我的收藏</span>
      </div>
    </div>
    <!-- 订单部分 -->
    <div class="Order">
      <h3>我的订单</h3>
      <a href>查看全部订单</a>
    </div>
    <!-- 操作导航 -->
    <div class="operation">
      <ul>
        <li>
          <a href="#" class="operation1">待付款</a>
        </li>
        <li>
          <a href="#" class="operation2">待发货</a>
        </li>
        <li>
          <a href="#" class="operation3">待收货</a>
        </li>
        <li>
          <a href="#" class="operation4">待评价</a>
        </li>
        <li>
          <a href="#" class="operation5">退款/售后</a>
        </li>
      </ul>
    </div>
    <!-- 收货地址管理 -->
    <div class="address">
      <h3>收货地址管理</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      avatarUrl: "",
      flage: true
    };
  },
  methods: {
    goLogon() {
      this.$router.push("/logon");
    },
    // 退出登录
    tuichu() {
      if (sessionStorage.getItem("name")) {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("avatarUrl");
        this.$router.push('/logon')
      } else {
        this.$router.push('/logon')
      }
    }
  },
  mounted() {
    let name = sessionStorage.getItem("name");
    let avatarUrl = sessionStorage.getItem("avatarUrl");
    this.name = name;
    this.avatarUrl = avatarUrl;
    if (this.name) {
      this.flage = false;
    } else {
      this.flage = true;
    }
  }
};
</script>

<style scoped>
.Body {
  background: #efeeee;
}
.van-nav-bar {
  background: #ff9900;
  color: #fff;
  height: 0.94rem;
  line-height: 0.94rem;
}
.van-ellipsis {
  font-size: 0.4rem;
  color: #fff;
}
.van-icon-comment-o {
  font-size: 0.47rem;
  color: #fff;
}
.van-icon-setting-o {
  font-size: 0.47rem;
  color: #fff;
}
.mine {
  width: 7.5rem;
  height: 3.94rem;
  background: linear-gradient(#ff9900 2.3rem, #fafafa 2.3rem);
  padding-top: 0.96rem;
}
.mineHeader {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  background: #e6dfdf;
  margin: 0 auto;
  border: 0.14rem solid #fff;
}
.mineHeader img {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
}
.clickLogon {
  font-size: 0.3rem;
  text-align: center;
  margin-top: 0.2rem;
}
.mineKeep {
  font-size: 0.3rem;
  margin-top: 0.5rem;
}
.mineKeep img {
  width: 0.4rem;
  height: 0.35rem;
}
.mineKeep span {
  margin-left: 0.2rem;
}
.Order {
  width: 7.05rem;
  height: 1.24rem;
  border-bottom: 1px solid #b3b3b3;
  margin-top: 0.13rem;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  line-height: 1.24rem;
  padding-left: 0.45rem;
}
.Order h3 {
  font-size: 0.3rem;
}
.Order a {
  font-size: 0.3rem;
  color: #999;
}
.operation {
  width: 7.5rem;
  height: 1.88rem;
  background: #fafafa;
}
.operation ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.88rem;
}
.operation ul li {
  height: 0.99rem;
}
.operation ul li a {
  color: #999;
  font-size: 0.24rem;
  height: 0.24rem;
  display: block;
  padding: 0.75rem 0.1rem 0 0.1rem;
  background: url(../../assets/images/icon_boligation.png) no-repeat 0.2rem 0;
  background-size: 0.54rem 0.47rem;
}
.operation ul li .operation2 {
  background: url(../../assets/images/prepare.png) no-repeat 0.17rem 0;
  background-size: 0.54rem 0.47rem;
}
.operation ul li .operation3 {
  background: url(../../assets/images/icon_consignee.png) no-repeat 0.17rem 0;
  background-size: 0.54rem 0.47rem;
}
.operation ul li .operation4 {
  background: url(../../assets/images/icon_evaluate.png) no-repeat 0.17rem 0;
  background-size: 0.54rem 0.47rem;
}
.operation ul li .operation5 {
  background: url(../../assets/images/icon_refund.png) no-repeat 0.25rem 0;
  background-size: 0.54rem 0.47rem;
}
.address {
  width: 7.5rem;
  height: 1.3rem;
  background: #fafafa;
  color: #999;
  font-size: 0.3rem;
  line-height: 1.3rem;
}
.address h3 {
  padding-left: 0.3rem;
  margin-top: 0.15rem;
}
</style>
