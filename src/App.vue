<template>
  <div id="app">
    <Library/>
  </div>
</template>

<script>
import Library from "./components/Library.vue";

export default {
  name: "app",
  components: {
    Library
  },
  mounted: function () {
    this.determineBrowserDimensions();
  },
  methods: {
    determineBrowserDimensions: function() {
      //> HEIGHT
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      // We listen to the resize event
      window.addEventListener("resize", () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: inherit;
  overflow: scroll;
}
body {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
