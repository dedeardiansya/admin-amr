<template>
  <b-card header="Navigation name">
    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
    <form @submit.prevent="submit">
      <b-form-group label="home">
        <b-form-input type="text" v-model="form.home" trim></b-form-input>
      </b-form-group>
      <b-form-group label="about">
        <b-form-input type="text" v-model="form.about" trim></b-form-input>
      </b-form-group>
      <b-form-group label="gallery">
        <b-form-input type="text" v-model="form.gallery" trim></b-form-input>
      </b-form-group>
      <b-form-group label="contact">
        <b-form-input type="text" v-model="form.contact" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Dark mode">
        <b-form-input type="text" v-model="form.dark_mode" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Light mode">
        <b-form-input type="text" v-model="form.light_mode" trim></b-form-input>
      </b-form-group>

      <b-button variant="primary" type="submit" :disabled="loading"
        >SUBMIT</b-button
      >
    </form>
  </b-card>
</template>

<script>
import { getDatabase, set, ref, onValue, off } from "firebase/database";
export default {
  data() {
    return {
      loading: false,
      error: "",
      form: {
        home: "",
        about: "",
        gallery: "",
        contact: "",
        dark_mode: "",
        light_mode: "",
      },
    };
  },
  mounted() {
    const db = getDatabase();
    const navigationRef = ref(db, "navigation");
    onValue(navigationRef, (snapshot) => {
      const data = snapshot.val();
      this.form = { ...this.form, ...data };
    });
  },
  beforeDestroy() {
    const db = getDatabase();
    const navigationRef = ref(db, "navigation");
    off(navigationRef);
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = "";
      const db = getDatabase();
      try {
        await set(ref(db, "navigation"), this.form);
        this.$bvToast.toast(`Navigation page updated`, {
          title: "Success",
          autoHideDelay: 5000,
        });
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
  },
};
</script>
