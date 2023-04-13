<template>
  <NavBar />
  <div class="container">
    <h1>Web</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
export default {
  name: "HomeView",
  components: {
    NavBar,
  },
};
</script>
