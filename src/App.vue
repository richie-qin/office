<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
button,
a {
  outline: none;
  border: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  overflow-x: auto;
}
div {
  box-sizing: border-box;
  font-size: 0;
}
</style>
