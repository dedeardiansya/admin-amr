<template>
  <b-card header="About page">
    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
    <form @submit.prevent="submit">
      <b-form-group label="Label">
        <b-form-input type="text" v-model="form.label" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Title">
        <b-form-input type="text" v-model="form.title" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea v-model="form.description" trim></b-form-textarea>
      </b-form-group>
      <b-form-group label="Name">
        <b-form-input type="text" v-model="form.name" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Paragraph">
        <b-form-textarea v-model="form.paragraph" trim></b-form-textarea>
      </b-form-group>
      <b-form-group label="Image URL">
        <b-form-input type="text" v-model="form.img_url" trim></b-form-input>
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
        label: "",
        title: "",
        description: "",
        name: "",
        paragraph: "",
        img_url: "",
      },
    };
  },
  mounted() {
    const db = getDatabase();
    const aboutRef = ref(db, "about");
    onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      this.form = { ...this.form, ...data };
    });
  },
  beforeDestroy() {
    const db = getDatabase();
    const aboutRef = ref(db, "about");
    off(aboutRef);
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = "";
      const db = getDatabase();
      try {
        await set(ref(db, "about"), this.form);
        this.$bvToast.toast(`About page updated`, {
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
