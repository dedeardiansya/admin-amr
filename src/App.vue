<template>
  <div id="app">
    <div class="text-center py-3 border-bottom">
      <h3>ADMIN</h3>
    </div>
    <div class="container py-3">
      <div class="card card-body text-center">
        <auth :user="user" />
      </div>
      <hr />
      <navigation />
      <hr />
      <home />
      <hr />
      <about />
      <hr />
      <contact />
      <hr />
      <gallery />
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import Auth from "./components/Auth";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
export default {
  components: {
    Auth,
    Navigation,
    Home,
    About,
    Contact,
    Gallery,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      this.user = user ?? null;
    });
  },
};
</script>
