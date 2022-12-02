<template>
  <b-card header="Gallery page">
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
      <b-button variant="primary" type="submit" :disabled="loading"
        >SUBMIT</b-button
      >
    </form>
    <hr />
    <form-upload @uploaded="onUploaded" />
    <hr />
    <div class="row">
      <div v-for="data in form.images" :key="data.fullname" class="col-md-4">
        <img :src="data.url" class="d-block w-100" />
        <b-button variant="danger" @click="remove(data.fullname)"
          >REMOVE</b-button
        >
      </div>
    </div>
  </b-card>
</template>

<script>
import { getDatabase, set, ref, onValue, off } from "firebase/database";
import * as st from "firebase/storage";
import FormUpload from "./FormUploadImage";
export default {
  components: {
    FormUpload,
  },
  data() {
    return {
      loading: false,
      error: "",
      form: {
        label: "",
        title: "",
        description: "",
        images: [],
      },
    };
  },
  mounted() {
    const db = getDatabase();
    const galleryRef = ref(db, "gallery");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      this.form = { ...this.form, ...data };
    });
  },
  beforeDestroy() {
    const db = getDatabase();
    const galleryRef = ref(db, "gallery");
    off(galleryRef);
  },
  methods: {
    onUploaded(data) {
      this.form.images.push(data);
      this.submit();
    },
    async remove(name) {
      this.form.images = this.form.images.filter(
        (data) => data.fullname !== name
      );
      await this.submit();
      try {
        const storage = st.getStorage();
        const storageRef = st.ref(storage, name);
        await st.deleteObject(storageRef);
      } catch (e) {
        console.log(e.message);
      }
    },
    async submit() {
      this.loading = true;
      this.error = "";
      const db = getDatabase();
      try {
        await set(ref(db, "gallery"), this.form);
        this.$bvToast.toast(`Gallery page updated`, {
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
