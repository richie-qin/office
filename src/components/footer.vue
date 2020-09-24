<template>
<div id="footer">
    <div id="content1">
        <img id="content1-img" src="../assets/image/nav_logo.png" alt="">
        <div id="content1-div1">© 2014-2020</div>
        <div id="content1-div2">深圳爱布丁梦想科技有限公司</div>
        <div id="content1-div3"> All Rights Reserved.</div>
        <div id="content1-div4">粤ICP备14032837号</div>
    </div>
    <div id="content2">
        <h3>关于点点租</h3>
        <div>关于我们</div>
        <div>团队招聘</div>
        <div>商务合作</div>
        <div>常见问题</div>
        <div>条款与隐私</div>
        <div>新闻资讯</div>
        <div>网站地图</div>
        <div>热门搜索词</div>
    </div>
    <div id="content3">
        <div id="content3-div1">友情链接</div>
        <div class="content3-top-text">热门办公室出租</div>
        <div class="content3-top-text">热门写字楼出租</div>
        <div class="content3-top-text">热门商务中心出租</div>
        <br>
        <div class="content3-text" v-for="(item,index) in 6" :key="index">上海兼职</div>
        <br>
        <div class="content3-text" v-for="(item,index) in 6" :key="index">上海兼职</div>
    </div>
    <div id="content4">
        <h3>客服服务</h3>
        <div id="content4-tel">4000-623-678</div>
        <div id="content4-time">(早9:00-晚8:00)</div>
        <div id="content4-em">12345678911@qq.com</div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
#footer{
    padding: 30px calc(50% - 600px) 0;
    width: 100%;
    height: 351px;
    font-size: 0;
    background: #202020;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
#content1{
    #content1-img{
        height: 30px;
        width: auto;
        margin-bottom: 20px;
    }
    div{
        color: #696b70;
        font-size: 11px;
        margin-bottom: 10px;
    }
}
#content2{
    h3{
        color: #b4b6bf;
        font-size: 13px;
        margin: 0 0 8px 0;
        line-height: 22px;
        font-weight: bold;
    }
    div{
        line-height: 22px;
        color: #696b70;
        font-size: 11px;
    }
}
#content3{
    #content3-div1{
        color: #b4b6bf;
        font-size: 13px;
        line-height: 22px;
        display: inline-block;

    }
    .content3-top-text{
        font-size: 13px;
        color: #696b70;
        margin: 0 0 25px 15px;
        display: inline-block;
        cursor: pointer;

    }
    .content3-text{
        margin-right: 12px;
        margin-bottom: 12px;
        font-size: 11px;
        color: #696b70;
        display: inline-block;
        cursor: pointer;

    }
}
#content4{
    h3{
        color: #b4b6bf;
        font-size: 13px;
        margin: 0 0 8px 0;
        line-height: 22px;
        font-weight: bold;
        margin-bottom: 13px;
        color: #696b70;
    }
    #content4-tel{
        font-size: 24px;
        font-weight: 500;
        margin: 0 0 8px 0;
        color: #696b70;
    }
    #content4-time{
        font-size: 11px;
        color: #696b70;
    }
    #content4-em{
        margin: 8px 0 10px 0;
        font-size: 11px;
        color: #696b70;
    }
}
</style>