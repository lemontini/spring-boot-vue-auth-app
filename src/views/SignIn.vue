<template>
  <v-card width="400" class="mx-auto mt-10 pa-5" elevation="5">
    <v-card-title>
      <h1 class="mx-auto my-5">Sign In</h1>
    </v-card-title>
    <v-card-text>
      <v-form id="signin" @submit.prevent="submitForm">
        <v-text-field label="Email" prepend-icon="mdi-email" />
        <v-text-field
          label="Password"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn plain color="info" to="/signup">Don't have an account?</v-btn>
      <v-spacer />
      <v-btn type="submit" form="signin" color="success">Sign In</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
  }),
  methods: {
    submitForm() {
      this.$router.go('/');
      console.log('Form submitted');
    },
  },
};
</script>

<style></style>
