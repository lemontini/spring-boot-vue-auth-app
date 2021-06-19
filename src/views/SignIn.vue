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
    <transition
      appear
      name="fade-transition"
      mode="out-in"
      :duration="{ enter: 80, leave: 80 }"
    >
      <v-card
        :key="fadeMode"
        width="450"
        class="mx-auto mt-10 pa-5"
        elevation="5"
      >
        <v-card-title>
          <h1 class="mx-auto my-7" v-if="mode == 'signin'">Sign In</h1>
          <h1 class="mx-auto my-7" v-else>Create Account</h1>
        </v-card-title>

        <v-card-subtitle class="social text-center">
          <v-btn id="facebook" fab small outlined
            ><v-icon>mdi-facebook</v-icon></v-btn
          >
          <v-btn id="google" fab small outlined
            ><v-icon>mdi-google-plus</v-icon></v-btn
          >
          <v-btn id="linkedin" fab small outlined
            ><v-icon>mdi-linkedin</v-icon></v-btn
          >
        </v-card-subtitle>

        <v-card-text>
          <p class="pt-5 text-center">
            {{
              mode === 'signin'
                ? 'or use your account'
                : 'or use your email for registration'
            }}
          </p>
          <v-form
            id="signup"
            v-model="formIsValid"
            @submit.prevent="submitForm"
          >
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

        <v-card-actions class="justify-center">
          <v-btn plain rounded color="info" @click="toggleMode()">{{
            mode == 'signup' ? 'Have an account?' : "Don't have an account?"
          }}</v-btn>
          <!-- <v-spacer /> -->
          <v-btn
            type="submit"
            form="signup"
            rounded
            class="px-5"
            color="success"
            :disabled="!formIsValid"
            >{{ mode == 'signin' ? 'Sign In' : 'Sign Up' }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,

    mode: 'signin',
    fadeMode: false,

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
      this.fadeMode = !this.fadeMode;
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
        console.log(err);
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

<style scoped>
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.social button {
  border-color: lightgrey;
  margin-left: 7px;
  margin-right: 7px;
}

#facebook:hover {
  color: #3b5998;
}

#google:hover {
  color: #db4a39;
}

#linkedin:hover {
  color: #0e76a8;
}
</style>
