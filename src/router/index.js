import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ScientistView from "@/views/ScientistView.vue";
import DataSubmissionView from "@/views/DataSubmissionView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/scientist",
    name: "Scientist View",
    component: ScientistView,
  },
  {
    path: "/dataSubmission",
    name: "Data Submission",
    component: DataSubmissionView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
