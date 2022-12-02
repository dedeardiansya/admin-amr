<template>
  <b-card header="Contact page">
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
      <b-form-group label="Form URL">
        <b-form-input type="text" v-model="form.form_url" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Address label">
        <b-form-input
          type="text"
          v-model="form.address_label"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Address value">
        <b-form-input
          type="text"
          v-model="form.address_value"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Phone label">
        <b-form-input
          type="text"
          v-model="form.phone_label"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Phone value">
        <b-form-input
          type="text"
          v-model="form.phone_value"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email label">
        <b-form-input
          type="text"
          v-model="form.email_label"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email value">
        <b-form-input
          type="text"
          v-model="form.email_value"
          trim
        ></b-form-input>
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
        form_url: "",
        address_label: "",
        address_value: "",
        phone_label: "",
        phone_value: "",
        email_label: "",
        email_value: "",
      },
    };
  },
  mounted() {
    const db = getDatabase();
    const contactRef = ref(db, "contact");
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      this.form = { ...this.form, ...data };
    });
  },
  beforeDestroy() {
    const db = getDatabase();
    const contactRef = ref(db, "contact");
    off(contactRef);
  },
  methods: {
    async submit() {
      this.loading = true;
      this.error = "";
      const db = getDatabase();
      try {
        await set(ref(db, "contact"), this.form);
        this.$bvToast.toast(`Contact page updated`, {
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
