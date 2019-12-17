<template>
  <div class="index">
    <div class="Header">
      <input type="text" name id />
    </div>
    <div class="Headerbanner">
      <img src="../../assets/images/banner.png" alt />
    </div>
    <div>
      <ul class="goods" v-for="(item,index) in goodlist" :key="index">
        <li>
          <div class="listTitle">
            <span class="listTitleImg">
              <img :src="titleimg[index]" alt />
            </span>

            <span class="listText">{{item.name}}</span>
          </div>
          <ul class="goodsMain">
            <li v-for="(i,index) in item.list" :key='index' @click='goList(i.id)'>
              <div class="listMainImg">
                <img :src="i.thumbnail" alt />
              </div>
              <div class="listMainName">
                <p>{{i.name}}</p>
              </div>
              <div class="listPrice">
                <span>￥{{i.reduct_price}}</span>
                <span>￥{{i.original_price}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleimg:[
        require("../../assets/images/hot.png"),
        require("../../assets/images/hot.png"),
        require("../../assets/images/hot.png"),
        require("../../assets/images/hot.png"),
        require("../../assets/images/hot.png"),
        require("../../assets/images/hot.png"),
      ],
      goodlist: [
        {
          name: "今日疯抢",
          img: require("../../assets/images/hot.png"),
          list: [
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
          ]
        },
        {
          name: "今日疯抢",
          img: require("../../assets/images/hot.png"),
          list: [
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
          ]
        },
        {
          name: "今日疯抢",
          img: require("../../assets/images/hot.png"),
          list: [
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
            {
              id: "123",
              name: "中国/bafif沐浴露500ml",
              original_price: "96.00",
              reduct_price: "88.00",
              thumbnail: require("../../assets/images/123.png"),
              product_id: "000"
            },
            
          ]
        },
        
      ]
    };
  },
  methods: {
    goList(id){
      this.$router.push({
        path:'/details',
        query:{
          id:id
        } 
      })
    },
    inis(){ 
      this.$http({
      url:'http://yd.msword.top/getIndexData',
      methed:'get',
    })
    .then(res=>{
      // console.log(res,'成功');
      this.goodlist = res.data.data
    })
    .catch(err=>{
      console.log('失败');
      
    })
    }
  },
 
  mounted(){
   this.inis()
  },
  acticeted(){
    this.inis()
  }
};
</script>

<style scoped>
.index {
  width: 7.5rem;
  background: #fafafa;
}
.Header {
  width: 7.5rem;
  height: 0.9rem;
  background: url(../../assets/images/indexHeader.png) no-repeat;
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
.Headerbanner {
  height: 3.8rem;
}
.Headerbanner img {
  width: 100%;
  height: 3.8rem;
}
.goods {
  width: 7.5rem;
  display: flex;
  justify-content: space-between;
}
.goods > li {
  height: 5.65rem;
  width: 3.29rem;
}
.goodsMain {
  height: 4.7rem;
  width: 7.5rem;
  overflow: hidden;
}
.goodsMain li {
  float: left;
  height: 4.66rem;
  width: 3.24rem;
  border: 2px solid #eee;
  margin-left: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #fff;
}
.listText {
  font-size: 0.26rem;
}
.listMainImg {
  height: 3.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.listMainImg img {
  max-height: 2.2rem;
  max-width: 2.28rem;
}
.listTitle {
  height: 0.94rem;
  line-height: 0.94rem;
  display: flex;
}
.listTitleImg {
  width: 0.5rem;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
}
.listTitleImg img {
  height: 0.38rem;
}
.listMainName p {
  line-height: 0.48rem;
  font-size: 0.26rem;
  padding: 0 0.2rem;
}
.listPrice {
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.22rem;
}
.listPrice span:nth-child(1) {
  color: #ffa002;
}
.listPrice span:nth-child(2) {
  color: #888;
}
</style>
