<template>
  <h1>Add Article</h1>
  <a href="/blog/list">
    <button class="btn btn-warning mt-3 mb-3">Back</button>
  </a>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Add Article</h5>
          <div class="form-group mb-3">
            <label>Thumbnail</label>
            <div
              v-if="input.images"
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage"
            ></div>
            <input
              ref="fileInput"
              type="file"
              @input="pickFile"
              class="form-control"
            />
          </div>
          <div class="form-group mb-3">
            <label>Title Article</label>
            <input type="text" class="form-control" v-model="input.title" />
          </div>
          <div class="form-group mb-3">
            <label>Article</label>
            <Editor
              @input="update"
              v-model="input.content"
              api-key="no-api-key"
              :init="{
                plugins: 'lists link image table code help wordcount',
              }"
            />
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" v-on:click="submit">
            Upload Article
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios.config";
import Editor from "@tinymce/tinymce-vue";
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2";
export default {
  name: "AddArticle",
  components: {
    Editor,
  },
  data() {
    return {
      previewImage: null,
      input: {
        images: "",
        title: "",
        content: "",
      },
    };
  },
  setup() {
    const editorValue = ref("");

    return {
      editorValue,
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    update(value) {
      console.log(value);
      this.input.content = value;
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.input.images = e.target.result;
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async submit() {
      const data = this.input;
      axios
        .post("blog", data)
        .then(response => {
          if (response.data.status) {
            Swal.fire({
              title: "Success",
              text: "Sucess to adding new article",
              icon: "success",
              showCancelButton: true,
            });
            this.$router.push({
              name: "List Article",
            });
          } else {
            Swal.fire({
              title: response.data.message,
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
              html: data.message,
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
<style scoped lang="scss">
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
