import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddRun from "../views/AddRun.vue";
import RunController from "../views/RunController.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/addRun",
    name: "addRun",
    component: AddRun
  },
  {
    path: "/runController",
    name: "runController",
    component: RunController
  }
];

const router = new VueRouter({
  routes
});

export default router;
