<template>
  <div>
    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
    <div v-if="user">
      <p class="mb-0">
        Login as, <strong>{{ user.displayName }}</strong>
      </p>
      <p class="mb-3 text-muted">{{ user.email }}</p>
    </div>
    <div>
      <b-button
        v-if="!user"
        variant="primary"
        @click="login"
        :disabled="loading"
        >LOGIN WITH GOOGLE</b-button
      >
      <b-button v-else variant="danger" @click="logout" :disabled="loading"
        >LOGOUT</b-button
      >
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      error: "",
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = "";
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      try {
        await signInWithPopup(auth, provider);
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
    async logout() {
      this.loading = true;
      this.error = "";
      const auth = getAuth();
      try {
        await signOut(auth);
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
  },
};
</script>
