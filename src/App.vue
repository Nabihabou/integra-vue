<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view :baseUrl="baseUrl"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      baseUrl: 'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080',
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
