<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <v-btn to="/signin" text>
        <span class="mr-2">Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
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
  }),

  methods: {
    signUp() {
      this.showSignUp = true;
      console.log('sign up requested: ' + this.showSignUp);
    },
  },
};
</script>
