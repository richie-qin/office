<template>
<!-- 委托 -->
  <div id="entrust">
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
      this.$store.commit('actNav', 3);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#entrust{
    width: 100%;
    background: #f7f7f7;
}

</style>