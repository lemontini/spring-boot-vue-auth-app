<template>
  <div class="home">
    <h1>Welcome, {{ user }}!</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.getters.currentUser || 'unauthenticated user';
    },
  },
};
</script>
