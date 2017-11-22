<template>
  <div id="trombinoscope">
    <v-layout column>
      <v-flex xs12 sm12>
        <v-toolbar color="softeam-banner" dark>
          <v-toolbar-title class="menu-title">{{ $t('message.menu.title') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <creation-person v-on:refreshList="refresh($event)"></creation-person>
          <v-btn icon class="menu-title">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
            <list-cards></list-cards>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import CreationPerson from "./CreationPerson"
  import ListCards from "./ListCards"

  export default {
    name: 'trombinoscope',
    components: {
      CreationPerson,
      ListCards
    },
  }
</script>

<!-- Le scope CSS est partagé car composant parent -->
<style scoped>
  h1, h2 {
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

  .menu-title {
    color: #FFFFFF;
  }

  .softeam-banner {
    background: #323B42
  }
</style>
