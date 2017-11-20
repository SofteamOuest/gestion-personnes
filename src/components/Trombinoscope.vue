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
        <v-container fluid grid-list-md class="grey lighten-4">
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs2`]: true }"
              v-for="person in persons"
              :key="person.id">
              <card :person="person"></card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import CreationPerson from "./CreationPerson"
  import Card from "./Card.vue";

  import axios from 'axios';
  import VueAxios from 'vue-axios';

  export default {
    name: 'trombinoscope',
    components: {
      Card,
      CreationPerson
    },
    data() {
      return {
        persons: [],
        dialogDetail: true
      }
    },
    methods: {
      loadPersons() {
        axios.get(process.env.API_PERSONNES_URL)
          .then(response => {
            this.persons = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      },
      refresh(event) {
        this.loadPersons();
      }
    },
    mounted() {
      this.loadPersons();
    }
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
