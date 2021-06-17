<template>
  <v-app>
    <v-app-bar class="overlay" app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <v-btn text rounded to="/login">
        <span class="mr-2">Log In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="!userSignedIn" text rounded to="/signin">
        <span class="mr-2">Sign In</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn v-else rounded @click="logout">Log out</v-btn>
      <i class="fab fa-facebook-f"></i>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer absolute>
      <v-spacer />
      Developed by&nbsp;<b>montini</b>, 2021
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  computed: {
    userSignedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      console.log('Logout requested.');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
}
</style>
