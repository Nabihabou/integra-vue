<template>
  <main>
    <transition name="slideUp">
      <header v-show="showHeader">
        Header
      </header>
    </transition>
    <router-view @hideHeader="hide" :allProjects="this.allProjects" :class="{ view: showHeader } "/>
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
import axios from 'axios'

export default {
  name: 'Header',
  data() {
    return {
      showHeader: true,
      allProjects: [],
    }
  },
  beforeMount() {
    if(this.allProjects = []) {
      axios({
        url: this.$root.baseUrl + '/project',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.$root.authData }
      })
      .then(response => {
        this.allProjects = response.data;
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err)
      })
    } else {}

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
    hide() {
      // console.log(this.showHeader);
      this.showHeader = false;
    }
  }
}
</script>

<style scoped lang="scss">
.view {
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