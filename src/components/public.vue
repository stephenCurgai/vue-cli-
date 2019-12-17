<template>
  <div class="publicNav">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view></router-view> -->
    <div class="foodNav">
      <ul>
        <li
          :class="[item.path==Path?item.class2:item.class1]"
          v-for="item in navList"
          :key="item.path"
          @click='goPath(item.path)'
        >
          <span>{{item.name}}</span>
        </li>
        <!--    <li class="sort">
          <span>分类</span>
        </li>
        <li class="buycar">
          <span>购物车</span>
        </li>
        <li class="mine">
          <span>我</span>
        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Path: "/index",
      navList: [
        {
          name: "首页",
          class1: "index",
          class2: "index2",
          path: "/index"
        },
        {
          name: "分类",
          class1: "sort",
          class2: "sort2",
          path: "/sort"
        },
        {
          name: "购物车",
          class1: "buycar",
          class2: "buycar2",
          path: "/buycar"
        },
        {
          name: "我",
          class1: "mine",
          class2: "mine2",
          path: "/mine"
        }
      ]
    };
  },
  methods: {
    goPath(rt){
      this.Path = rt
      this.$router.push(rt)
    }
  },
  mounted(){
    this.Path = this.$route.path
  }
};
</script>
<style scoped>
.foodNav {
  width: 7.5rem;
  height: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 2px solid #eee;
  background: #fff;
}
.foodNav ul {
  display: flex;
  justify-content: space-around;
  font-size: 0.22rem;
  width: 7.5rem;
}
.foodNav ul li {
  padding: 0.13rem 0;
  display: flex;
  justify-content: space-around;
  height: 0.74rem;
  display: flex;
  align-items: flex-end;
  flex: 4;
}
.foodNav ul .index {
  background: url(../assets/images/tab_home_nor.png) no-repeat 0.7rem 0.14rem;
  background-size: 0.4rem 0.4rem;
}
.foodNav ul .sort {
  background: url(../assets/images/tab_menu_nor.png) no-repeat 0.75rem 0.14rem;
  background-size: 0.4rem 0.4rem;
}
.foodNav ul .buycar {
  background: url(../assets/images/tab_shopping_nor.png) no-repeat 0.7rem
    0.14rem;
  background-size: 0.4rem 0.4rem;
}
.foodNav ul .mine {
  background: url(../assets/images/tab_me_nor.png) no-repeat 0.75rem 0.14rem;
  background-size: 0.4rem 0.4rem;
}
.foodNav ul .index2 {
  background: url(../assets/images/tab_home_hig.png) no-repeat 0.7rem 0.14rem;
  background-size: 0.4rem 0.4rem;
  color: #ff9900;
}
.foodNav ul .sort2 {
  background: url(../assets/images/tab_menu_hig.png) no-repeat 0.75rem 0.14rem;
  background-size: 0.4rem 0.4rem;
  color: #ff9900;
}
.foodNav ul .buycar2 {
  background: url(../assets/images/tab_shopping_hig.png) no-repeat 0.7rem
    0.14rem;
  background-size: 0.4rem 0.4rem;
  color: #ff9900;
}
.foodNav ul .mine2 {
  background: url(../assets/images/tab_me_hig.png) no-repeat 0.75rem 0.14rem;
  background-size: 0.4rem 0.4rem;
  color: #ff9900;
}
</style>