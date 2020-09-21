<template>
<!-- 企业礼包 -->
  <div id="gift">
      <black-nav></black-nav>
  </div>
</template>
<script>
import blackNav from "../components/blackNav"
export default {
    components:{blackNav},
  data() {
    return {};
  },
  created() {
      this.$store.commit('actNav', 5);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#gift{
    width: 100%;
    background: #f7f7f7;
}

</style>