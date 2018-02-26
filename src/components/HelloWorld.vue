<template>
  <g-signin-button
     :params="googleSignInParams"
     @success="onSignInSuccess"
     @error="onSignInError">
     Sign in with Google
   </g-signin-button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '955592758900-pfa889fd569vhg740tblsklgnoiqs621.apps.googleusercontent.com'
      },
      userProfile: {},
      signInError: {},
    }
  },
  props: [
    'baseUrl',
  ],
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getAuthResponse().id_token;
      this.userProfile = profile;
      console.log(this.userProfile);

      // $http.get($rootScope.baseUrl + '/auth?idToken=' + gapi.auth2.getAuthInstance().currentUser.get().Zi.id_token).then(function(obj) {
      axios.get(this.baseUrl + '/auth?idToken=' + googleUser.getAuthResponse().id_token)
      .then(response => {
        console.log(response);
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
