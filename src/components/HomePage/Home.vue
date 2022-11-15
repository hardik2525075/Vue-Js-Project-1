<template>
  <v-main>
    <v-app>
      <v-app-bar app>
        <Header />
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <Dashboard />
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <Footer />
      </v-footer>
    </v-app>
  </v-main>
</template>

<script>
import Dashboard from "./Dashboard.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "HomePage",
  components: {
    Header,
    Dashboard,
    Footer,
  },
};
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}
</style>