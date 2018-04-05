<template>
  <main>
    <transition name="slideUp">
      <header v-show="showHeader">
        Header
      </header>
    </transition>
    <router-view id="view"/>
    <nav>
      <ul>
        <!-- <router-link to="/" tag="a" exact>Dash</router-link> -->
        <router-link to="/" tag="a" exact><img src="../assets/calendar.svg" /></router-link>
        <router-link to="/attendance" tag="a" exact><img src="../assets/clipboard.svg" /></router-link>
        <router-link to="/projects" tag="a" exact><img src="../assets/projects.svg" /></router-link>
        <router-link to="/oficios" tag="a" exact><img src="../assets/file.svg" /></router-link>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showHeader: Boolean,
    }
  },
  created() {
    let previousPosition = window.pageYOffset || document.documentElement.scrollTop;
    let vm = this;

    window.onscroll = function() {
      var currentPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (previousPosition > currentPosition) {
        vm.showHeader = true;
      } else {
        vm.showHeader = false;
      }

      previousPosition = currentPosition;
    };
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
#view {
  margin-top: 60px;
  margin-bottom: 40px;
}

.slideUp-enter-active, .slideUp-leave-active {
  transition: all .5s;
}
.slideUp-enter, .slideUp-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: -60px;
}

header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
  background-color: white;
  z-index: 99;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0; right: 0;
  padding: 16px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.04);
}

ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>