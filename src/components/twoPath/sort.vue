<template>
  <div class="Sort">
    <div class="Header">
      <input type="text" name id />
    </div>
    <!-- 主体内容 -->
    <div class="Main">
      <div class="mainLeft">
        <ul class="mainLeftUl" v-for="(item,index) in sortList" :key="index">
          <li :class="[index==num?'mainLeftUlLi1':'']" @click='changeList(index)'>{{item.name}}</li>
          <!-- <li>美妆护肤</li>
          <li>家居生活</li>
          <li>食品营养</li>
          <li>全球直邮</li> -->
        </ul>
      </div>
      <div class="mainRight">
        <ul class="mainRightMain" v-if="sortList[num]">
          <li v-for="(item,index) in sortList[num].list" :key="index" >
            <div class="mainRightImg">
              <img :src="item.thumbnail" alt="">
            </div>
            <div class="mainRightText">
               {{item.name}}
            </div>
           
          </li>
       <!--    <li>
            <div class="mainRightImg">

            </div>
          </li>
          <li>
            <div class="mainRightImg">

            </div>
          </li>
          <li>
            <div class="mainRightImg">

            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      num:0,//切换css样式中间值
      // 列表数据
      sortList:[]
    }
  },
  methods:{
    changeList(i){
      this.num = i
    }
  },
  mounted(){
    this.$nextTick(()=>{
      
    })
    this.$http({
      url: "http://yd.msword.top/getClassify",
      methed: "get"
    })
      .then(res => {
        // console.log(res.data.data, "详情成功");
        this.sortList = res.data.data;
        // console.log(this.sortList);
        
      })
      .catch(err => {
        console.log("失败");
      });
  }
};
</script>
<style lang="" scoped>
.Sort{
  background: #fafafa;
}
.Header {
  width: 7.5rem;
  height: 0.9rem;
  background: #ff9900;
  text-align: center;
  line-height: 0.9rem;
}
.Header input {
  width: 4.36rem;
  height: 0.6rem;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.5) url(../../assets/images/search.png)
    no-repeat;
  border-radius: 0.15rem;
  padding: 0 0.6rem 0 0.2rem;
  background-size: 0.39rem 0.39rem;
  background-position: 4.58rem 0.1rem;
  color: #999;
}
.Main{
  width: 7.5rem;
  display: flex;
  justify-content: space-between;
}
.Main .mainLeft{
  width: 2.35rem;
}
.Main .mainRight{
  width: 5.15rem;
}
.mainLeftUl{
  width: 2.35rem;
}
.mainLeftUl li{
  width: 2.25rem;
  height: 0.93rem;
  line-height: 0.93rem;
  font-size: 0.26rem;
  border-left: 0.1rem solid #fafafa;
}
.mainLeftUl .mainLeftUlLi1{
  border-left: 0.1rem solid #1d84a7;
  color: #ff9900;
  background: #fff;
}
.mainRightMain{
  width: 4.95rem;
  padding: 0 0.1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mainRightMain li{
  width: 2.24rem;
  height: 2.34rem;
  border: 2px solid #1d84a7;
  border-radius: 0.05rem;
  margin-top: 0.2rem;
}
.mainRightImg{
  height: 1.87rem;
  display: flex;
  align-items: flex-end;
  display: flex;
  justify-content: space-around;
}
.mainRightText{
  height: 0.5rem;
  background: #1d84a7;
  color: #fff;
  text-align: center;
  font-size: 0.2rem;
  line-height: 0.5rem;
}
.mainRightImg img{
  width: 1.65rem;
  height: 1.73rem;
}
</style>