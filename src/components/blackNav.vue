<template>
  <div id="black-nav">
        <div id="nav-left">
            <router-link to="./index" class="nav-l-item" :class="{'activityNav':activityNav==1}">首页</router-link>
            <router-link to="./building" class="nav-l-item" :class="{'activityNav':activityNav==2}">写字楼</router-link>
            <router-link to="./resource" class="nav-l-item" :class="{'activityNav':activityNav==3}">优选好房</router-link>
            <router-link to="./entrust" class="nav-l-item" :class="{'activityNav':activityNav==4}">委托找房</router-link>
            <router-link to="./throwIn" class="nav-l-item" :class="{'activityNav':activityNav==5}">投放房源</router-link>
            <router-link to="./mapLookup" class="nav-l-item" :class="{'activityNav':activityNav==6}">地图找房</router-link>
        </div>
        <div id="nav-right">
            <div id="nav-right-tel">
                <i class="el-icon-phone-outline"></i>
                <span>4000-623-678</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
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
#black-nav{
    width: 100%;
    height: 40px;
    padding: 0 calc(50% - 600px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #202020;
    #nav-left{
        display: flex;
        align-items: center;
        .nav-l-item{
            height: 17px;
            font-size: 12px;
            color: #b4b6bf;
            margin-right: 20px;
            cursor: pointer;
            &:hover{
                color: #17a1e6;
            }
        }
        .activityNav{
            color: #17a1e6;
        }
    }
    #nav-right{
        #nav-right-tel{
            display: flex;
            align-items: center;
            i{
                font-size: 18px;
                color: #cc2929;
            }
            span{
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                margin-left: 10px;
            }
        }
    }
}

</style>