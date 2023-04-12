<template>
  <Navbar />
  <div class="container mt-3">
    <h1>{{ name }}</h1>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: { Navbar },
};
</script>
