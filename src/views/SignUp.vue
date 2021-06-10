<template>
  <v-card width="400" class="mx-auto mt-10 pa-5" elevation="5">
    <v-card-title>
      <h1 class="mx-auto my-5">Create Account</h1>
    </v-card-title>

    <v-card-text>
      <v-form id="signup" v-model="formValidity" @submit.prevent="submitForm">
        <v-text-field
          label="Username"
          prepend-icon="mdi-account-circle"
          v-model.trim="username"
          :rules="usernameRules"
          required
        />
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model.trim="email"
          :rules="emailRules"
          required
        />
        <v-text-field
          label="Password"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          :rules="passwordRules"
          required
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn plain color="info" to="/signin">Have an account?</v-btn>
      <v-spacer />
      <v-btn
        type="submit"
        form="signup"
        color="success"
        :disabled="!formValidity"
        >Sign Up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    username: '',
    usernameRules: [
      (value) => !!value || 'Username is required.',
      (value) =>
        value.length >= 5 || 'Username must have at least 5 characters.',
    ],

    email: '',
    emailRules: [
      (value) => !!value || 'Email is required.',
      (value) =>
        value.indexOf('@') !== 0 || "Email should include recipient's name.",
      (value) => value.includes('@') || "Email should have an '@' symbol.",
      // TODO: validate emails of usernames with dot - i.e. zigmantas.kulikauskas@gmail.com
      (value) =>
        value.indexOf('.') - value.indexOf('@') > 1 ||
        'Email should have a valid domain name.',
      (value) =>
        value.indexOf('.') <= value.length - 3 ||
        'Email should contain a valid top-level domain',
    ],

    password: '',
    passwordRules: [
      (value) => !!value || 'Password is required.',
      (value) =>
        value.length >= 8 || 'Password must have at least 8 characters.',
    ],

    formValidity: false,
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
