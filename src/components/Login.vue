<template lang="html">

  <section class="login">
    <h1>login Component</h1>
    <g-signin-button
     :params="googleSignInParams"
     @success="onSignInSuccess"
     @error="onSignInError">
     Sign in with Google
   </g-signin-button>
  </section>

</template>

<script lang="js">
  import axios from 'axios';
  import Router from 'vue';

  export default  {
    name: 'LoginComponent',
    props: [],
    mounted() {

    },
    data() {
      return {
        googleSignInParams: {
          client_id: '955592758900-pfa889fd569vhg740tblsklgnoiqs621.apps.googleusercontent.com'
        },
        userProfile: {},
        signInError: {},
      }
    },
    methods: {
      onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getAuthResponse().id_token;
      this.userProfile = profile;
      console.log(this.userProfile);

      axios.get(this.$root.baseUrl + '/auth?idToken=' + googleUser.getAuthResponse().id_token)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('ls.auth', response.data.token)
        this.$router.push('/')
      })
      .catch(e => {
        this.signInError = e;
      })
      },
      onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      }
    },
    computed: {

    }
}
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
