<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>Welcome, {{ user }}!</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  computed: {
    user() {
      console.log(this.$store.getters.userId);
      return this.$store.getters.currentUser || 'unauthenticated user';
    },
  },
};
</script>
