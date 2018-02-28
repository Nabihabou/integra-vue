<template>
  <div id="app">
    <router-view :baseUrl="baseUrl"/>
  </div>
</template>

<script>
import Router from 'vue';

export default {
  name: 'App',
  data() {
    return {
      baseUrl: 'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080',
    }
  },
  beforeMount() {
    var access_token = localStorage.getItem("ls.auth");
    if(access_token == null) {
      this.$router.push({ name: 'LoginComponent' })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
