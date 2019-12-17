<template>
  <div class="buy">
    <van-nav-bar title="购物车" left-text right-text left-arrow />
    <div class="header">
      <ul>
        <li class="Buycay" v-for="(item,index) in buyList" :key="index"  @touchstart='onstart($event,index)' @touchmove='onmove($event,index)' @touchend='onend($event,index)' ref='reff' >
          <div class="buycayDiv">
            <div class="check">
              <input type="checkbox" v-model="item.check" @click="getCheck(index)" />
            </div>
            <div class="BuyImg">
              <img src="../../assets/images/123.png" alt />
            </div>
            <div class="detaile">
              <div>
                <span>{{item.name}}{{item.age}}</span>
                <span>{{item.size}}</span>
              </div>
              <div>
                <van-stepper v-model="item.number" />
              </div>
            </div>
            <div class="price">
              <span>￥{{item.price*item.number}}</span>
            </div>
           
          </div>
           <div class="del" @click="del(index)">
            删除
          </div>
        </li>
      </ul>
      <div class="kong" v-if="flage" >
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2802571586,2144537201&fm=15&gp=0.jpg" alt="">
      </div>
    </div>
    <div class="goBuy">
      <div class="checkMain">
        <div>
          <label for="checkMain">全选</label>
          <input type="checkbox" name id="checkMain" v-model="checkBig" @click="checkbig()" />
        </div>
        <div>
          <label for="checkMain2">编辑</label>
          <input type="checkbox" name id="checkMain2" />
        </div>
      </div>
      <div class="Totalprice">
        <p>合计：￥{{priseAll}}</p>
        <p>（不含运费）</p>
      </div>
      <div class="jiesaun">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接受详情页的数据
      buyList: [],
      checkBig:false,
      flage:true,
      touchstart:'',
      touchmove:'',
    };
  },
  methods: {
    // 滑动开始
    onstart(a,i){
      /* console.log(a);
      
      console.log(a.touches[0].clientX,'aaa'); */
      this.touchstart = a.touches[0].clientX;
      // console.log(this.touchstart,'开始');
    },
    onmove(a,i){
    
      
      console.log(this.$refs.reff,'$refs');
      // console.log(a.touches[0].clientX,'bbb');
      this.touchmove = a.touches[0].clientX;
      // console.log(this.touchmove,'结束');
      let moveX = this.touchmove-this.touchstart  ;
      if(moveX>0){
        this.$refs.reff[i].style.transitionDuration=`1s`;
       this.$refs.reff[i].style.transform=`translateX(0px)`;
      }else if(moveX<0){
         this.$refs.reff[i].style.transitionDuration=`1s`;
        this.$refs.reff[i].style.transform=`translateX(-1.5rem)`;
      }
    },
    onend(a,i){
      // console.log(a,'ccc');
      
      // console.log(a.touches[0].clientX,'ccc');
      // this.touchstart = a.touches[0].clientX;
      // console.log(this.touchstart);
    },
    // 全选按钮
    checkbig(){
      // console.log(this.checkBig);
      if(this.checkBig == false){
        this.buyList.map((item,index)=>{
          item.check = true;
        })
      }else{
          this.buyList.map((item,index)=>{
          item.check = false;
        })
      }
    },
    // 全选
    getCheck(i){
      // console.log(this.buyList[i].check);
      this.buyList[i].check = !this.buyList[i].check
      // console.log(this.buyList[i].check);
      let result = this.buyList.map((item,index)=>{
        return item.check
      })
      // console.log(result);
      let arr = result.every(function(value,index,array){
        return value == true
      })
      // console.log(arr,'arr');
      if(arr == true){
        this.checkBig = true
      }else{
        this.checkBig = false
      }
    },
    // 删除
    del(i){
      this.buyList.splice(i,1)
      localStorage.setItem("carArr", JSON.stringify(this.buyList));
      if(this.buyList.length == 0){
      this.flage = true;
      // console.log(this.buyList,'妹纸');
      
    }
    else{
      this.flage = false;
      // console.log('有值');
      
    }
    }
  },
  mounted() {
    let list = JSON.parse(localStorage.getItem("carArr"));
    // console.log(list);
    this.buyList = list;
    if(this.buyList.length == 0){
      this.flage = true;
      // console.log(this.buyList,'妹纸');
      
    }
    else{
      this.flage = false;
      // console.log('有值');
      
    }
    // console.log(this.buyList);
  },
  computed:{
     priseAll(){
                    let priseAll = 0
                    this.buyList.map((item,index)=>{
                        if(item.check == true){
                            priseAll+=item.price*item.number
                        }
                    })
                    return priseAll
                }
  }
};
</script>

<style scoped>
.kong{
  width: 7.5rem;
  position: fixed;
  left: 0;
  top: 2rem;
}
.kong img{
  width: 7.5rem;
}
.buy{
  background: #fafafa
}
.goBuy {
  width: 7.5rem;
  height: 1.16rem;
  position: fixed;
  left: 0;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  background: #fff;
}

.checkMain {
  width: 2.8rem;
  display: flex;
  height: 1.16rem;
  justify-content: space-around;
}
.checkMain > div {
  font-size: 0.28rem;
  height: 1.16rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.checkMain > div input {
  width: 0.45rem;
  height: 0.45rem;
}
.Totalprice{
  width: 1.8rem;
  height: 1.16rem;
  color: #999999;
  font-size: 0.22rem;
  line-height: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.jiesaun{
  width: 2.3rem;
  height: 1.16rem;
  background: #ff5500;
  color: #fff;
  font-size: 0.36rem;
  line-height: 1.16rem;
  text-align: center;
}
.header {
  margin-bottom: 2.5rem;
}
.header ul{
  width: 7.5rem;
  overflow: hidden;
}
.Buycay {
  width: 9rem;
  background: #fafafa;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.buycayDiv {
  width: 7.5rem;
  height: 2.55rem;
  display: flex;
  justify-content: space-around;
}
.del{
  width: 1.25rem;
  background:#ff9900;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  line-height: 1.8rem;
  height: 1.8rem;
 /*  position: absolute;
  top: 0;
  right: -1.5rem; */
}
.check {
  width: 1rem;
  line-height: 2.55rem;
  text-align: center;
}
.check input {
  width: 0.4rem;
  height: 0.4rem;
}
.BuyImg {
  width: 1.6rem;
  display: flex;
  align-items: center;
}
.BuyImg img {
  width: 1.6rem;
  height: 1.6rem;
}
.detaile {
  font-size: 0.3rem;
  width: 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.detaile span {
  margin-right: 0.1rem;
  line-height: 0.45rem;
}
.detaile span:nth-child(2) {
  font-size: 0.28rem;
  color: #999;
}
.price {
  width: 1.5rem;
  text-align: center;
  line-height: 2.55rem;
  font-size: 0.26rem;
}
.van-nav-bar {
  background: #ff9900;
  color: #fff;
  height: 0.94rem;
  line-height: 0.94rem;
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
</style>
