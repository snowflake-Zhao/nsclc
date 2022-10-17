<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <!-- title -->
        <span>NSCLC</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Layout />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "./components/Layout";

export default {
  name: "App",

  components: {
    Layout,
  },

  data: () => ({
    //
  }),
};
</script>
