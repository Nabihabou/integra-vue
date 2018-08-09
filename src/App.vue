<template>
  <div id="app">
    <!-- <Header></Header> -->
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Router from 'vue'


export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    Header
  },
  beforeMount() { 
    // TODO: Check if user exists
    var access_token = localStorage.getItem("ls.auth");
    if(access_token == null) {
      this.$router.push({ name: 'LoginComponent' })
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/reset';

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #474747;
}

input::placeholder {
  color: rgba(115, 127, 143, 0.32);
}

option[disabled] {
  color: red
}

*:focus {
  outline: none;
}

/* form */

.error {
  color: red
}

.input-group {
  margin-bottom: 16px
}

.input--error {
  border: 1px solid red !important;
}


</style>
