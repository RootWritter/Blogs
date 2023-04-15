import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import ListView from "../views/Blog/ListView.vue";
import AddView from "../views/Blog/AddView.vue";
import EditView from "../views/Blog/EditView.vue";
import DeleteView from "../views/Blog/DeleteView.vue";
import ReadArticle from "../views/ReadArticle.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login Pages",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register Pages",
    component: RegisterView,
  },
  {
    path: "/blog/list",
    name: "List Article",
    component: ListView,
  },
  {
    path: "/blog/add",
    name: "Add Article",
    component: AddView,
  },
  {
    path: "/blog/edit/:id",
    name: "Edit Article",
    component: EditView,
  },
  {
    path: "/blog/delete/:id",
    name: "Delete Article",
    component: DeleteView,
  },
  {
    path: "/article/:slug",
    name: "Read Article",
    component: ReadArticle,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
