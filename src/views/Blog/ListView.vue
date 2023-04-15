<template>
  <h1>List Article</h1>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">List Article</h5>
          <a href="/blog/add">
            <button class="btn btn-primary mt-3 mb-3">Add Article</button>
          </a>
          <div class="table-responsive">
            <DataTable
              :data="list"
              :columns="columns"
              :options="{ responsive: true }"
              class="table table-striped table-bordered display"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Action</th>
                </tr>
              </thead>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios.config";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import Swal from "sweetalert2";
import "datatables.net-responsive-bs5";
DataTable.use(DataTableLib);

export default {
  name: "BlogList",
  components: {
    DataTable,
  },
  data() {
    return {
      list: null,
      columns: [
        { data: "id" },
        { data: "title" },
        {
          data: "thumbnail",
          render: function (data, type, row, meta) {
            let image = `<img src="${row.thumbnail}" class="img-thumbnail">`;
            return image;
          },
        },
        {
          data: "id",
          render: function (data, type, row, meta) {
            let button = "";
            button += `<a href="/blog/edit/${row.id}"><button class="btn btn-warning mr-1">Edit</button></a>`;
            button += `<a href="/blog/delete/${row.id}"><button class="btn btn-danger mr-1">Delete</button></a>`;
            return button;
          },
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async delete(id) {
      console.log("id", id);
    },
    async getData() {
      await axios
        .get("blog/list")
        .then(response => {
          let data = response.data.data;
          data.forEach(item => {
            item.thumbnail =
              process.env.VUE_APP_BASE_URL + "uploads/images/" + item.thumbnail;
            return item;
          });
          console.log(data);
          this.list = data;
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
