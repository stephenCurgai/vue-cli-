<template>
  <div class="details">
    <!-- 轮播 -->
    <div class="detailsTop">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swiperImg" :key="index">
          <img :src="item" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="detailsTitle">
        <span @click="goprevious()">
          <img src="../assets/images/detailsIcon1.png" alt />
        </span>
        <div>
          <span @click="goBuy()">
            <img src="../assets/images/detailsIcon2.png" alt />
          </span>
          <span>
            <img src="../assets/images/detailsIcon3.png" alt />
          </span>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="introduce">
      <div class="introduce1">
        <p>{{jieshao.name}}</p>
        <div>
          <img src="../assets/images/shoucangIco.png" alt />
          <span>收藏</span>
        </div>
      </div>
      <!-- 下半部 -->
      <div class="introduce2">
        <div>
          <span>￥{{jieshao.reduct_price}}</span>
          <span>￥{{jieshao.original_price}}</span>
        </div>
        <div class="describe">
          <ul>
            <li>{{jieshao.allowance}}折</li>
            <li>包邮</li>
          </ul>
          <ul>
            <li v-for="(item,index) in jieshao.describe" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="color"></div>
    <!-- 详情口碑 -->
    <div class="detailsTabel">
      <div
        :class="[flage==true?'detailsTabelMain':'']"
        class="detailsTabelMain1"
        @click="flage=true"
      >商品详情</div>
      <div
        :class="[flage==true?'':'detailsTabelMain']"
        class="detailsTabelMain1"
        @click="flage=false"
      >买家口碑</div>
    </div>
    <div class="detailsImgs" v-if="flage">
      <img v-for="(item,index) in shopDes" :key="index" :src="item" alt />
    </div>
    <!--买家口碑 -->
    <div class="evaluate" v-if="!flage">
      <ul class="evaluateTitle">
        <li
          v-for="(item,index) in buyerReviews"
          :key="index"
          :class="[index==evaluateTitle?'evaluateTitle2':'evaluateTitle1']"
          @click="changeCenter(index,item.flages)"
        >{{item.name}}</li>
        <!--         <li>好评</li>
        <li>差评</li>
        <li>晒单</li>-->
      </ul>
      <ul class="evaluateList">
        <li v-for="(item,index) in evaluate[pingjiaType]" :key="index">
          <div class="listName">
            <span>{{item.buyerName}}</span>
            <span>2015-10-03 21:47:13</span>
          </div>
          <div class="listMain">
            <img v-for="(i,d) in item.postImg" :key="d" :src="i" alt />
            <p>{{item.postDescribe}}</p>
          </div>
          <div class="listGuan">
            <p>{{item.adminReviews}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 阴影遮罩加入购物车弹窗 -->
    <div class="Mask" v-show="flage2">
      <div class="Buycar">
        <div class="Buycar1">
          <div>
            <img src="../assets/images/evaluate.jpg" alt />
          </div>
          <div class="BuycarPrires">
            <span>￥{{jieshao.reduct_price}}</span>
            <span>库存{{total}}</span>
            <span>请选择商品属性</span>
          </div>
          <div class="BuycarClose">
            <span @click="BuycarClose()"></span>
          </div>
        </div>
        <div class="Buycar2">
          <h2>购买数量</h2>
          <van-stepper v-model="number" />
        </div>
        <!-- 多少升L -->
        <div class="Buycar3">
          <h2>{{buySelect.name}}</h2>
          <ul class="Buycar3Ul">
            <li
              v-for="(item,index) in buySelect.list"
              :key="index"
              :class="[sizeNum==index?'Buycar3Li':'']"
              @click="changesizeNum(index)"
            >{{item}}</li>
          </ul>
        </div>
        <div class="Buycar3">
          <h2>{{buySelect1.name}}</h2>
          <!-- 多大年龄 -->
          <ul class="Buycar3Ul">
            <li
              v-for="(item,index) in buySelect1.list"
              :key="index"
              :class="[ageNum==index?'Buycar3Li':'']"
              @click="changeageNum(index)"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <van-goods-action>
        <div class="zongjia">
          <span>总价：</span>
          <span class="zongjiaMian">￥0.001</span>
        </div>
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="goBuycar()" />
      </van-goods-action>
    </div>
    <van-goods-action>
      <div class="zongjia">
        <span>总价：</span>
        <span class="zongjiaMian">￥0.00</span>
      </div>
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 1, //步长
      flage: true,
      flage2: false,
      detailsId: "", //赋值传过来的id
      // detailsTabel:detailsTabelMain,
      swiperImg: [
        require("../assets/images/product4.png"),
        require("../assets/images/product4.png"),
        require("../assets/images/product4.png")
      ],
      jieshao: {
        //简单介绍
        name: "",
        allowance: "",
        original_price: "",
        reduct_price: "",
        describe: []
      },
      shopDes: [
        //商品详情
      ],
      evaluateTitle: 0, //切换评价class中间值
      pingjiaType: "all", //评价种类中间值
      buyerReviews: [
        {
          flages: "all",
          name: "全部评价"
        },
        {
          flages: "good",
          name: "好评"
        },
        {
          flages: "bad",
          name: "差评"
        },
        {
          flages: "postForm",
          name: "晒单"
        }
      ],
      evaluate: {}, //评价
      total: "",
      sizeNum: 0, //参数大小中间值
      buySelect: [
        //购买参数大小
      ],
      ageNum: 0, //年龄中间值
      buySelect1: [] //购买参数年龄
    };
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    goBuy(){
      this.$router.push('/buycar')
    },
    onClickButton() {
      //打开遮罩
      this.flage2 = true;
    },
    BuycarClose() {
      //遮罩关闭按钮
      this.flage2 = false;
    },
    changeCenter(i, f) {
      this.evaluateTitle = i;
      this.pingjiaType = f;
    },
    goprevious() {
      this.$router.go(-1);
    },
    // 改变多少升的中间值
    changesizeNum(i) {
      this.sizeNum = i;
    },
    // 改变年龄的中间值
    changeageNum(i) {
      this.ageNum = i;
    },
    // 点击遮罩里的加入购物车的事件
    goBuycar() {
      console.log(111);
      // 设置一个空的数组去接受数据
      let arr = [];
      let obj = {
        size: this.buySelect.list[this.sizeNum],
        age: this.buySelect1.list[this.ageNum],
        name: this.jieshao.name,
        price: Number(this.jieshao.reduct_price),
        number: this.number,
        check:false
      };
       // 值取出后push到arr中
      // 判断本地存储中是否有数据，有就【取出来】,在push,没有的话就可以直接存了
      if (localStorage.getItem("carArr")) {
        // console.log("存储有值");
        // 取值是JOSN格式的字符串,转化一下
        arr = JSON.parse(localStorage.getItem("carArr"));
        arr.push(obj);
        localStorage.setItem("carArr", JSON.stringify(arr));
        // console.log(arr);
      } else {
        // console.log("妹纸");
        arr.push(obj);
        // 将arr存到localstorage中，但由于只能存字符串所以需要转
        localStorage.setItem("carArr", JSON.stringify(arr)); //第一个参数名字(自取),第二个参数要存的数据
      }
     
    },
    // 解决返回上一层的页面不记录位置，将接口附给一个函数，在挂载里调用
    inis(){
      // 接受传值
    this.detailsId = this.$route.query.id;
    // console.log(this.detailsId);
    this.$http({
      url: "http://yd.msword.top/getDetails?pid=" + this.detailsId,
      methed: "get"
    })
      .then(res => {
        // console.log(res, "详情成功");
        this.swiperImg = res.data.data.swiperImgArr; //轮播图
        this.jieshao.allowance = (res.data.data.allowance * 10).toFixed(1); //折扣
        this.jieshao.name = res.data.data.name; //商品名
        this.jieshao.original_price = res.data.data.original_price; //原价
        this.jieshao.reduct_price = res.data.data.reduct_price; //折后价
        this.jieshao.describe = res.data.data.describe; //标签
        this.shopDes = res.data.data.shopDes; //商品详情图
        this.evaluate = res.data.data.buyerReviews; //评价
        this.buySelect = res.data.data.buySelect[0]; //购买参数大小
        this.buySelect1 = res.data.data.buySelect[1]; //购买参数年龄
        this.total = res.data.data.total; //库存
      /*   console.log(res.data.data.buySelect);
        console.log(this.buySelect); */
      })
      .catch(err => {
        console.log("失败");
      });
    }
  },
  mounted() {
    this.inis()
  },
  activeted(){//解决keep-alive缓存没有在调取接口的问题
    this.inis() //上面定义的函数
  }
};
</script>
<style scoped>
.Mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(000, 000, 000, 0.8);
  left: 0;
  top: 0;
  z-index: 100;
}
.Buycar {
  width: 6.9rem;
  height: 5.74rem;
  background: #fff;
  position: absolute;
  padding: 0 0.3rem;
  bottom: 1rem;
  left: 0;
}
.Buycar1 {
  width: 6.9rem;
  height: 2rem;
  display: flex;
}
.Buycar1 div img {
  width: 2rem;
  height: 2rem;
}
.BuycarPrires {
  display: flex;
  flex-direction: column;
  font-size: 0.24rem;
  padding: 0.25rem 0;
  justify-content: space-around;
}
.BuycarPrires span:nth-child(1) {
  color: red;
}
.BuycarClose {
  margin-left: 2.7rem;
  padding: 0.3rem 0;
}
.BuycarClose span {
  display: block;
  width: 0.57rem;
  height: 0.57rem;
  background: url(../assets/images/close.png) no-repeat;
  background-size: 0.57rem 0.57rem;
}
.Buycar2 {
  width: 6.9rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem;
}
.van-stepper {
  width: 2rem;
  height: 0.5rem;
}
.Buycar2 .van-stepper .van-stepper__minus {
  width: 0.5rem;
  height: 0.5rem;
}
.Buycar2 .van-stepper .van-stepper__plus {
  width: 0.5rem;
  height: 0.5rem;
}
.Buycar2 .van-stepper .van-stepper__input {
  width: 1rem;
  height: 0.5rem;
}
.Buycar3 {
  width: 6.9rem;
  /* height: 1rem; */
  margin-top: 0.2rem;
}
.Buycar3 h2 {
  font-size: 0.28rem;
}
.Buycar3Ul {
  width: 6.9rem;
  display: flex;
}
.Buycar3Ul li {
  font-size: 0.24rem;
  height: 0.45rem;
  padding: 0 0.38rem;
  line-height: 0.45rem;
  background: #dddddd;
  color: #999c;
  border-radius: 0.15rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
}
.Buycar3Ul .Buycar3Li {
  background: #ff9900;
  color: #fff;
}
/* 遮罩 */
.details {
  width: 7.5rem;
}
.detailsTop {
  position: relative;
}
.detailsTitle {
  width: 7.1rem;
  height: 0.8rem;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
}
.detailsTitle div {
  width: 1.45rem;
  display: flex;
  justify-content: space-between;
}
.detailsTitle span img {
  width: 0.57rem;
  height: 0.57rem;
}
.van-swipe {
  height: 5.4rem;
  text-align: center;
}
.van-swipe img {
  height: 5.4rem;
}
.introduce {
  border-top: 2px solid #ddd;
}
.introduce1 {
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduce1 p {
  font-size: 0.28rem;
  line-height: 0.48rem;
  padding: 0 0.3rem;
}
.introduce1 > div {
  width: 0.98rem;
  height: 0.7rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  font-size: 0.16rem;
  color: red;
  border-left: 1px solid #ddd;
}
.introduce1 > div img {
  width: 0.36rem;
  height: 0.36rem;
}
.introduce2 {
  height: 0.8rem;
  display: flex;
}
.introduce2 div:nth-child(1) {
  width: 1.82rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 0.3rem;
  height: 0.7rem;
}
.introduce2 div:nth-child(1) span:nth-child(1) {
  color: red;
  font-size: 0.28rem;
}
.introduce2 div:nth-child(1) span:nth-child(2) {
  color: #b5b5b5;
  font-size: 0.28rem;
  font-size: 0.2rem;
}
.describe {
  width: 4.8rem;
  height: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.describe ul:nth-child(1) {
  height: 0.3rem;
  width: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.describe ul:nth-child(1) li {
  height: 0.3rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  background: #ff9900;
  padding: 0 0.1rem;
  color: #fff;
}
.describe ul:nth-child(2) {
  height: 0.35rem;
  width: 4.8rem;
  overflow: hidden;
  display: flex;
  /* justify-content: space-between; */
}
.describe ul:nth-child(2) li {
  height: 0.26rem;
  padding: 0 0.1rem;
  border: 2px solid #ff9900;
  color: #ff9900;
  line-height: 0.26rem;
  font-size: 0.2rem;
  margin-right: 0.2rem;
}
.color {
  height: 0.32rem;
  background: #eeeeee;
}
.detailsTabel {
  width: 5.3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.detailsTabelMain1 {
  width: 1.5rem;
  height: 0.58rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.24rem;
  border-bottom: 2px solid #fff;
}
.detailsTabelMain {
  border-color: #ff9900;
  color: #ff9900;
}
.detailsImgs {
  text-align: center;
}
.detailsImgs img {
  width: 6.54rem;
  margin: 0 auto;
}
.van-goods-action {
  border-top: 1px solid #ddd;
}
.zongjia {
  width: 3.2rem;
  height: 0.98rem;
  line-height: 0.98rem;
  font-size: 0.3rem;
  color: #666;
  padding-left: 0.28rem;
}
.van-button {
  height: 0.98rem;
  font-size: 0.28rem;
  border-radius: 0;
}
.zongjiaMian {
  color: red;
}
.evaluate {
  border-top: 1px solid #ddd;
  margin-top: 0.1rem;
}
.evaluateTitle {
  width: 6.9rem;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0;
  border-bottom: 1px solid #ddd;
  margin: 0 auto;
}
.evaluateTitle li {
  width: 1.35rem;
  height: 0.5rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
}
.evaluateTitle1 {
  background: #999;
}
.evaluateTitle2 {
  background: #ff9900;
}
.evaluateList {
  margin-bottom: 1rem;
}
.evaluateList li {
  width: 6.9rem;
  padding: 0 0.3rem;
  border-bottom: 1px solid #ddd;
}
.listName {
  line-height: 0.62rem;
  display: flex;
  justify-content: space-between;
}
.listName span:nth-child(1) {
  font-size: 0.24rem;
  color: #ff9900;
}
.listName span:nth-child(2) {
  font-size: 0.14rem;
  color: #b9b9b9;
}
.listMain img {
  width: 1.5rem;
  height: 1.5rem;
}
.listMain p {
  line-height: 0.38rem;
  font-size: 0.2rem;
  color: #999;
}
.listGuan {
  background: #ddd;
  border-radius: 0.1rem;
  padding: 0.1rem 0.2rem;
}
.listGuan p {
  font-size: 0.18rem;
  line-height: 0.24rem;
}
</style>