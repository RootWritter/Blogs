<template>
  <h1>Login</h1>

  <div class="row mt-3">
    <div class="col-md-8 m-auto">
      <div class="card">
        <h5 class="card-header">Login Sekarang</h5>
        <div class="card-body">
          <div class="form-group mb-3">
            <label>Alamat Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              v-model="data.email"
              placeholder="Masukan Alamat Email anda"
            />
          </div>
          <div class="form-group mb-3">
            <label>Kata Sandi</label>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="data.password"
              placeholder="Masukan Kata Sandi Akun anda"
            />
          </div>
        </div>
        <div class="card-footer">
          <button type="reset" class="btn btn-danger mr-1">Reset</button>
          <button type="button" v-on:click="login" class="btn btn-primary">
            Login
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
  name: "LoginPages",
  components: {},
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const data = this.data;
      axios
        .post("auth/login", data)
        .then(result => {
          if (result.data.status) {
            Swal.fire({
              title: "Login Success",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Dashboard",
            }).then(action => {
              /* Read more about isConfirmed, isDenied below */
              if (action.isConfirmed) {
                console.log(result.data.data);
                localStorage.setItem("token", result.data.data.access_token);
                localStorage.setItem(
                  "user",
                  JSON.stringify(result.data.data.user)
                );
                return this.$router.push({
                  name: "Home",
                });
              }
            });
          } else {
            Swal.fire({
              title: result.data.message,
              icon: "error",
              showCancelButton: true,
            });
            return;
          }
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let data = error.response.data;
            let ErrorMessage = "";
            if (data.message.length > 1) {
              for (let em of data.message) {
                ErrorMessage += em + "<br/>";
              }
            } else {
              ErrorMessage = data.message;
            }
            console.log(data.message.length);
            Swal.fire({
              title: "We got an Error",
              html: ErrorMessage,
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
          return;
        });
    },
  },
};
</script>
