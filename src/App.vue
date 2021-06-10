<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <v-btn v-if="!userSignedIn" rounded to="/signin" text>
        <span class="mr-2">Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn v-else rounded @click="logout">Log out</v-btn>
    </v-app-bar>

    <v-main>
      <!-- <sign-up v-if="showSignUp"></sign-up> -->
      <router-view></router-view>
    </v-main>

    <v-footer absolute>
      <v-spacer />
      Developed by&nbsp;<b>montini</b>, 2021
    </v-footer>
  </v-app>
</template>

<script>
// import SignUp from './components/SignUp.vue';
export default {
  name: 'App',

  components: {
    // SignUp
  },

  data: () => ({
    showSignUp: false,
    userSignedIn: true,
  }),

  methods: {
    signUp() {
      this.showSignUp = true;
      console.log('sign up requested: ' + this.showSignUp);
    },
    logout() {
      console.log('Logoout requested.');
    },
  },
};
</script>
