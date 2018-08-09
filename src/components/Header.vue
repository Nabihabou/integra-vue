<template>
  <main>
    <transition name="slideUp">
      <header v-if="headerOn" v-show="showHeader">
        {{$mq}}
      </header>
    </transition>
    <router-view 
      @remove-header="remove" 
      @put-header="putBack"
      @hideHeader="hide" 
      @show-header="show" 
      :userProfile="this.userProfile"
      :allProjects="this.allProjects" 
      :class="{ view: showHeader } "/>
    <nav>
      <ul>
        <!-- <router-link to="/" tag="a" exact>Dash</router-link> -->
        <router-link to="/" id="link1" tag="a" exact>
          <span class="link-name" v-if="$mq === 'desktop'">Calendário</span>
        </router-link>
        <router-link to="/attendance" id="link2" tag="a" exact>
          <span class="link-name" v-if="$mq === 'desktop'">Frequência</span>
        </router-link>
        <router-link to="/projects" id="link3" tag="a" exact>
          <span class="link-name" v-if="$mq === 'desktop'">Projetos</span>
        </router-link>
        <router-link to="/oficios" id="link4" tag="a" exact>
          <span class="link-name" v-if="$mq === 'desktop'">Ofícios</span>
        </router-link>
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
      headerOn: true,
      allProjects: [],
      userProfile: []
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
        this.loadProfile()
      })
      .catch(err => {
        console.log(err)
      })
    } else {}
  
    let previousPosition = window.pageYOffset || document.documentElement.scrollTop;
    let vm = this;

    if(window.innerWidth <= 767) {
      window.onscroll = function() {
        var currentPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (previousPosition > currentPosition) {
          vm.showHeader = true;
        } else {
          vm.showHeader = false;
        }

        previousPosition = currentPosition;
      };
    }
  },
  methods: {
    hide() {
      // console.log(this.showHeader);
      this.showHeader = false;
    },
    show() {
      this.showHeader = true;
    },
    remove() {
      this.headerOn = false;
    },
    putBack() {
      this.headerOn = true;
    },
    loadProfile() {
      axios({
        url: this.$root.baseUrl + '/api/profile/my',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.$root.authData }
      })
      .then(response => {
        // console.log(response.data);
        this.userProfile = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/colors';

.view {
  margin-top: 60px;
  // margin-bottom: 40px;
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
  z-index: 3;
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

// .router-link-active[href='/'] {
//   background-image: url('../assets/calendar-active.svg');
//   background-repeat: no-repeat;
//   width: 20px;
//   height: 22px
// }

#link1, #link2, #link3, #link4 {
  background-repeat: no-repeat;
}

a#link1 {
  background-image: url('../assets/calendar.svg');
  width: 20px;
  height: 22px;

  &.router-link-active {
    background-image: url('../assets/calendar-active.svg');
  }
}

a#link2 {
  background-image: url('../assets/clipboard.svg');
  width: 20px;
  height: 22px;

  &.router-link-active {
    background-image: url('../assets/clipboard-active.svg');
  }
}

a#link3 {
  background-image: url('../assets/projects.svg');
  width: 24px;
  height: 20px;

  &.router-link-active {
    background-image: url('../assets/projects-active.svg');
  }
}

a#link4 {
  background-image: url('../assets/file.svg');
  width: 20px;
  height: 22px;

  &.router-link-active {
    background-image: url('../assets/file-active.svg');
  }
}

@media (min-width: 767px) {
  header {
    box-shadow: unset;
  }

  nav {
    top: 60px;
    padding-left: 60px;
    bottom: unset;
  }

  .view {
    margin-top: calc(60px + 55px);
  }

  ul {
    display: block;
  }

  .router-link-active .link-name {
    color: $nav-text-color--active;
  }

  .link-name {
    color: $nav-text-color;
    margin-left: 28px;
    line-height: 22px;
  }

  #link1, #link2, #link3, #link4 {
    & span {
      margin-right: 60px
    }
  }
}
</style>