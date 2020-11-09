<template>
  <div id="footer">
    <div id="footer-content1">
      <div class="footer-logo">
        <img src="../assets/image/qz-logo1.png" alt="" />
      </div>
      <div class="footer-item">
        <h3>服务支持</h3>
        <div class="item-list-i">办公室出租</div>
        <div class="item-list-i">写字楼出租</div>
      </div>
      <div class="footer-item">
        <h3>快速链接</h3>
        <div class="item-list-i">商务合作</div>
        <div class="item-list-i">网站地图</div>
      </div>
      <div class="footer-item">
        <h3>服务支持</h3>
        <div class="item-list-i">联系电话</div>
        <div class="item-list-i">地址</div>
      </div>
      <div class="footer-item">
        <h3>关于巧租</h3>
      </div>
    </div>

    <div id="footer-content2">
        <div>© 2014-2020</div>
        <div>青岛归山网络科技有限公司 提供技术支持</div>
        <div>All Rights Reserved.</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
#footer {
  padding: 30px calc(50% - 600px) 10px;
  width: 100%;
  font-size: 0;
  background: #202020;
  overflow: hidden;
}
#footer-content1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.footer-logo {
  width: 20%;
  img {
    width: 30%;
    height: auto;
  }
}
.footer-item {
  width: 20%;
  h3 {
    font-size: 22px;
    color: #b4b6bf;
    font-weight: bold;
    margin-bottom: 25px;
  }
  .item-list-i {
    font-size: 14px;
    color: #696b70;
    line-height: 30px;
    cursor: pointer;
    &:hover{
        color: #888;
    }
  }
}
#footer-content2 {
    margin-top: 50px;
  div{
      font-size: 12px;
      color: #696b70;
      text-align: center;
      line-height: 25px;
  }
}
</style>
