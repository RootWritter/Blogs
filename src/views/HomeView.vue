<template>
  <h1>Home</h1>

  <div class="row">
    <div class="col-md-4" v-for="item in list_news">
      <div class="card">
        <img :src="item.thumbnail" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">Created by : {{ item.author.name }}</p>
          <a :href="item.link_article" class="btn btn-primary">Read Article</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios.config";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      list_news: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios
        .get("blog")
        .then(response => {
          let data = response.data.data;
          data.forEach(item => {
            item.thumbnail =
              process.env.VUE_APP_BASE_URL + "uploads/images/" + item.thumbnail;
            item.link_article = "/article/" + item.slug;
            return item;
          });
          this.list_news = data;
        })
        .catch(error => {});
    },
  },
};
</script>
