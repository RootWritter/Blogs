<template>
  <h1>{{ data?.title }}</h1>
  <img :src="data?.thumbnail" />
  <div v-html="data?.content"></div>
</template>
<script>
import axios from "@/axios.config";

export default {
  name: "ReadArticle",
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    const params = this.$route.params;
    this.getArticle(params.slug);
  },
  methods: {
    async getArticle(slug) {
      await axios
        .get(`blog/read/${slug}`)
        .then(response => {
          if (response.data.data) {
            let data = response.data.data;
            data.thumbnail =
              process.env.VUE_APP_BASE_URL + "uploads/images/" + data.thumbnail;
            this.data = data;
          } else {
            this.$router.push({
              name: "Home",
            });
          }
        })
        .catch(error => {
          this.$router.push({
            name: "Home",
          });
        });
    },
  },
};
</script>
