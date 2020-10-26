<template>
<div id="search-nav">
      <div id="search-nav-left">
        <img @click="$router.push('/')" src="../assets/image/nav_logo2.png" alt />
        <router-link to="./building"  :class="{'activityNav':activityNav==2}">写字楼</router-link>
        <router-link to="./resource"  :class="{'activityNav':activityNav==3}">优选好房</router-link>
        <router-link to="./entrust"  :class="{'activityNav':activityNav==4}">委托找房</router-link>
        <router-link to="./throwIn"  :class="{'activityNav':activityNav==5}">投放房源</router-link>
        <router-link to="./mapLookup"  :class="{'activityNav':activityNav==6}">地图找房</router-link>
      </div>
      <div id="search-nav-right">
        <el-input placeholder="请输入大厦名称" v-model="input4" :clearable="true">
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      input4: "",
    };
  },
  computed:{
      activityNav(){
          return this.$store.state.actNav
      }
  },
  created() {},
  methods: {
    toSearch(){
      if(this.$route.name=="building"){
        this.$emit('searchKey',this.input4)
      }else{
        this.$router.push({name:"building",params:{searchKey:this.input4}})
      }
    }
  },
  watch:{
    input4(val){
      if(val==""){
        this.$emit('searchKey',"")
      }
    }
  }
};
</script>
<style lang='less' scoped>
#search-nav {
  height: 70px;
  border: solid 1px #ddd;
  width: 100%;
  padding: 0 calc(50% - 600px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  #search-nav-left {
    display: flex;
    align-items: center;
    img {
      height: 35px;
      width: auto;
      margin-right: 15px;
      cursor: pointer;
    }
    span {
      font-size: 12px;
      margin-right: 30px;
    }
    .activityNav{
      color: #17a1e6;
    }
    a {
      line-height: 28px;
      margin-right: 30px;
      color: #666;
      font-size: 16px;
      cursor: pointer;
      &:hover{
          color: #17a1e6;
      }
    }
  }
  #search-nav-right {
    /deep/ .el-input {
      width: 480px;
      border-radius: 5px;
    }
    /deep/ .el-button {
      color: #888;
      font-size: 18px;
    }
  }
}
</style>