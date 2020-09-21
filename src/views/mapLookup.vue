<template>
<!-- 地图找房 -->
  <div id="mapLookup">
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
      this.$store.commit('actNav', 6);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#mapLookup{
    width: 100%;
    background: #f7f7f7;
}

</style>