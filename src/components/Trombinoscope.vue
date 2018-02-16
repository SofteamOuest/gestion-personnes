<template>
  <div id="trombinoscope">
    <v-layout column>
      <v-flex xs12 sm12>
        <list-cards></list-cards>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ListCards from "./ListCards";

export default {
  name: "Trombinoscope",
  components: {
    ListCards
  }
};
</script>

<!-- Le scope CSS est partagé car composant parent -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
