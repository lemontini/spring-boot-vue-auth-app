<template>
  <div>
    <v-snackbar v-model="snackbar"
      >{{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card width="400" class="mx-auto mt-10 pa-5" elevation="5">
      <v-card-title>
        <h1 class="mx-auto my-5" v-if="mode == 'signin'">Sign In</h1>
        <h1 class="mx-auto my-5" v-else>Create Account</h1>
      </v-card-title>

      <v-card-text>
        <v-form id="signup" v-model="formIsValid" @submit.prevent="submitForm">
          <v-text-field
            v-if="mode !== 'signin'"
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
        <!-- <v-btn plain color="info" to="/signin">Have an account?</v-btn> -->
        <v-btn plain color="info" @click="toggleMode()">{{
          mode == 'signup' ? 'Have an account?' : "Don't have an account?"
        }}</v-btn>
        <v-spacer />
        <v-btn
          type="submit"
          form="signup"
          color="success"
          :disabled="!formIsValid"
          >{{ mode == 'signin' ? 'Sign In' : 'Sign Up' }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,

    mode: 'signin',

    username: '',
    usernameRules: [
      (value) => !!value || 'Username is required',
      (value) =>
        value.length >= 5 || 'Username must have at least 5 characters',
    ],

    email: '',
    emailRules: [
      (value) => !!value || 'Email is required',
      (value) =>
        value.indexOf('@') !== 0 || "Email should include recipient's name",
      (value) => value.includes('@') || "Email should have an '@' symbol",
      (value) =>
        value.lastIndexOf('.') - value.indexOf('@') > 1 ||
        'Email should have a valid domain name',
      (value) =>
        value.lastIndexOf('.') <= value.length - 3 ||
        'Email should contain a valid top-level domain',
      (value) => (value.match(/@/g) || []).length === 1 || 'Invalid email',
    ],

    password: '',
    passwordRules: [
      (value) => !!value || 'Password is required',
      (value) =>
        value.length >= 8 || 'Password must have at least 8 characters',
    ],

    formIsValid: false,

    error: null,
    snackbar: false,
  }),

  methods: {
    toggleMode() {
      if (this.mode === 'signup') {
        this.mode = 'signin';
      } else {
        this.mode = 'signup';
      }
    },
    async submitForm() {
      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode == 'signin') {
          await this.$store.dispatch('signIn', actionPayload);
        } else {
          actionPayload.username = this.username;
          await this.$store.dispatch('signUp', actionPayload);
        }
      } catch (err) {
        this.error = err.response.data.message;
        this.snackbar = true;
        return;
      }

      this.$router.push('/');
      console.log('Form submitted');
    },
  },
};
</script>

<style></style>
