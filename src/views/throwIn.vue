<template>
<!-- 投放 -->
  <div id="throwIn">
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
      this.$store.commit('actNav', 4);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#throwIn{
    width: 100%;
    background: #f7f7f7;
}

</style>