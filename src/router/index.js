import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Joao from "../views/Joao.vue";
import Rodrigo from "../views/Rodrigo.vue";
import Lucas from "../views/Lucas.vue";
import Weslley from "../views/Weslley.vue";
import Luana from "../views/Luana.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Joao",
    name: "Joao",
    component: Joao,
  },
  {
    path: "/Rodrigo",
    name: "Rodrigo",
    component: Rodrigo,
  },
  {
    path: "/Lucas",
    name: "Lucas",
    component: Lucas,
  },
  {
    path: "/Weslley",
    name: "Weslley",
    component: Weslley,
  },
  {
    path: "/Luana",
    name: "Luana",
    component: Luana,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
