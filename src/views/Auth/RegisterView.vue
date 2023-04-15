<template>
  <h1>Register</h1>

  <div class="row mt-3">
    <div class="col-md-8 m-auto">
      <div class="card">
        <h5 class="card-header">Register Now</h5>
        <div class="card-body">
          <div class="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              v-model="data.name"
              placeholder="Enter your name"
            />
          </div>
          <div class="form-group mb-3">
            <label>Email Address</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="data.email"
              placeholder="Enter your email address"
            />
          </div>
          <div class="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="data.password"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div class="card-footer">
          <button type="reset" class="btn btn-danger mr-1">Reset</button>
          <button type="button" v-on:click="login" class="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios.config";
import Swal from "sweetalert2";
export default {
  name: "RegisterPages",
  components: {},
  data() {
    return {
      data: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  methods: {
    async login() {
      const data = this.data;
      axios
        .post("auth/register", data)
        .then(result => {
          if (result.data.status) {
            console.log(result.data.data);
            localStorage.setItem("token", result.data.data.access_token);
            localStorage.setItem("user", JSON.stringify(result.data.data.user));
            this.$router.push({
              name: "Home",
            });
          } else {
            Swal.fire({
              title: result.data.message,
              icon: "error",
              showCancelButton: true,
            });
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let data = error.response.data;
            Swal.fire({
              title: "We got an Error",
              html: data.error,
              icon: "error",
              showCancelButton: true,
            });
          } else if (error.request) {
            Swal.fire({
              title: "Internal Server Error",
              text: error.request,
              icon: "error",
              showCancelButton: true,
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            Swal.fire({
              text: "We got an Error",
              icon: "error",
              showCancelButton: true,
            });
          }
        });
    },
  },
};
</script>
