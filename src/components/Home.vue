<template>
  <b-card header="Home page">
    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
    <form @submit.prevent="submit">
      <b-form-group label="Title">
        <b-form-input type="text" v-model="form.title" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea v-model="form.description" trim></b-form-textarea>
      </b-form-group>
      <b-form-group label="App Name">
        <b-form-input type="text" v-model="form.app_name" trim></b-form-input>
      </b-form-group>
      <b-form-group label="App Title">
        <b-form-input type="text" v-model="form.app_title" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Background URL">
        <b-form-input type="text" v-model="form.bg_url" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Instagram">
        <b-form-input type="text" v-model="form.ig" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Facebook">
        <b-form-input type="text" v-model="form.fb" trim></b-form-input>
      </b-form-group>
      <b-form-group label="WhatsApp">
        <b-form-input type="text" v-model="form.wa" trim></b-form-input>
      </b-form-group>
      <b-form-group label="GitHub">
        <b-form-input type="text" v-model="form.gh" trim></b-form-input>
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
        title: "",
        description: "",
        app_name: "",
        app_title: "",
        bg_url: "",
        ig: "",
        fb: "",
        gh: "",
        wa: "",
      },
    };
  },
  mounted() {
    const db = getDatabase();
    const homeRef = ref(db, "home");
    onValue(homeRef, (snapshot) => {
      const data = snapshot.val();
      this.form = { ...this.form, ...data };
    });
  },
  beforeDestroy() {
    const db = getDatabase();
    const homeRef = ref(db, "home");
    off(homeRef);
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = "";
      const db = getDatabase();
      try {
        await set(ref(db, "home"), this.form);
        this.$bvToast.toast(`Home page updated`, {
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
