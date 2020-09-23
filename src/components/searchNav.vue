<template>
<div id="search-nav">
      <div id="search-nav-left">
        <img src="../assets/image/nav_logo2.png" alt />
        <span>合肥</span>
        <div>去去去</div>
        <div>去去去</div>
        <div>去去去</div>
      </div>
      <div id="search-nav-right">
        <el-input placeholder="请输入大厦名称" v-model="input4">
          <el-button slot="append" icon="el-icon-search"></el-button>
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
  methods: {},
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
  #search-nav-left {
    display: flex;
    align-items: center;
    img {
      height: 28px;
      width: auto;
      margin-right: 5px;
    }
    span {
      font-size: 12px;
      margin-right: 30px;
    }
    div {
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