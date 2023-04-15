<template>
  <nav class="navbar navbar-expand-lg bg-primary mb-3" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item" v-if="this.auth">
            <a class="nav-link" href="blog/list">List Article</a>
          </li>
        </ul>
        <div v-if="!this.auth">
          <a class="btn btn-success mr-1" href="/login">Login</a>
          <a class="btn btn-warning" href="/register">Register</a>
        </div>
        <div v-else>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">{{ this.user.name }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import Swal from "sweetalert2";

export default {
  name: "NavBar",
  data() {
    return {
      user: null,
      auth: false,
    };
  },
  beforeMount() {
    console.log("before mount");
  },
  beforeCreate() {
    console.log("before function");
    const token = localStorage.getItem("token");
    if (token) {
      this.auth = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  created() {
    console.log("created function");
    const token = localStorage.getItem("token");
    if (token) {
      this.auth = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure ?",
        html: "Want to logout",
        icon: "error",
        showCancelButton: true,
      }).then(result => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.$router.push({
            name: "Login Pages",
          });
        }
      });
    },
  },
};
</script>
