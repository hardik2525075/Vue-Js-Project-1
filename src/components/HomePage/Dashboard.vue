<template>
  <div class="products">
    <h1>Dashboard Component</h1>
    <div class="logout">
      <v-btn v-on:click="getUserDetials" rounded color="primary" dark>
        Details
      </v-btn>
      <v-btn v-on:click="removeUser" rounded color="primary" dark>
        Log Out
      </v-btn>
    </div>
  </div>
</template>

<script>
import {RouteEnum} from "../../router/routeEnum";
export default {
  name: "DashboardComponent",
  methods: {
    removeUser() {
      localStorage.clear();
      this.$router.push(RouteEnum.LOGIN);
    },
    getUserDetials() {
      let data = localStorage.getItem("user");
      data = JSON.parse(data);
      console.log(data);
    },
  },
};
</script>

<style scoped>
</style>