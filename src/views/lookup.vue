<template>
<!-- 找房 -->
  <div id="lookup">
      <black-nav></black-nav>
      <div id="search-nav">
          <div id="search-nav-left">
              <img src="../assets/image/nav_logo2.png" alt="">
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
      <div id="search-box">
          <div class="search-item" v-for="item in 7" :key="item">
              <div class="search-item-type" >城市：</div>
              <div class="search-item-data" >
                  <div class="search-item-data-i">北京</div>
                  <div class="search-item-data-i">上海</div>
                  <div class="search-item-data-i">南京</div>
                  <div class="search-item-data-i">福建</div>
              </div>
          </div>
      </div>
      <div id="content-box">
          <div id="content-left-box">
              <div id="data-list-type">
                  <div class="data-list-type-item">反反复复</div>
                  <div class="data-list-type-item">反反复复</div>
                  <div class="data-list-type-item">反反复复</div>
                  <div class="data-list-type-item">反反复复</div>
                  <div id="data-num">反反复复</div>
              </div>
              <div>
                  <house></house>
              </div>
          </div>
          <div id="content-right-box">

          </div>
      </div>
  </div>
</template>
<script>
import blackNav from "../components/blackNav"
import house from "../components/house"
export default {
    components:{blackNav,house},
  data() {
    return {
        input4:""
    };
  },
  created() {
      this.$store.commit('actNav', 2);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#lookup{
    width: 100%;
    background: #fff;
}
#search-nav{
    height: 70px;
    border:solid 1px #ddd;
    width: 100%;
    padding: 0 calc(50% - 600px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    #search-nav-left{
        display: flex;
        align-items: center;
        img{
            height: 28px;
            width: auto;
            margin-right: 5px;

        }
        span{
            font-size: 12px;
            margin-right: 30px;

        }
        div{
            line-height: 28px;
            margin-right: 30px;
            color: #666;
            font-size: 16px;
        }
    }
    #search-nav-right{
        /deep/ .el-input {
            width: 480px;
            border-radius: 5px;
        }
        /deep/ .el-button{
            color: #888;
            font-size: 18px;
        }
    }
}
#search-box{
    width: 1200px;
    background: #fff;
    border:solid 1px #ddd;
    margin: 30px auto;
    padding: 5px 10px;
    .search-item{
        display: flex;
        align-items: center;
        height: 28px;
        border-bottom: dashed  1px #ddd;
        .search-item-type{
            font-size: 14px;
            color: #999;
        }
        .search-item-data{
            display: flex;
            align-items: center;
            padding-left: 20px;
            .search-item-data-i{
                font-size: 13px;
                color: #333;
                cursor: pointer;
                margin-right: 15px;
                &:hover{
                    color: #cc2929;
                }
            }
        }
    }
}
#content-box{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    #content-left-box{
        width: 860px;
        height: 800px;
        background: chartreuse;
        #data-list-type{
            height: 50px;
            margin-top: 20px;
            border-bottom: 2px solid #17a1e6;
            .data-list-type-item{
                height: 100%;
                padding: 0 25px;
                line-height: 50px;
                font-size: 16px;
                cursor: pointer;
                &:hover{
                    
                }
            }
            #data-num{
                float: right;
            }
        }
    }
    #content-right-box{
        width: 340px;
        height: 800px;
        background: red;
    }
}
</style>