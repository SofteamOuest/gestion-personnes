<template>
  <div id="trombi">
    <v-layout column>
      <v-flex xs12 sm12>
        <v-toolbar color="softeam-banner" dark>
          <v-toolbar-title class="menu-title">SOFTEAM Trombinoscope</v-toolbar-title>
          <v-spacer></v-spacer>
          <creation-utilisateur></creation-utilisateur>
          <v-btn icon class="menu-title">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid grid-list-md class="grey lighten-4">
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs2`]: true }"
              v-for="personne in personnes"
              :key="personne.id">
              <personne-card :personne="personne"></personne-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import CreationUtilisateur from "./CreationUtilisateur"
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import PersonneCard from "./PersonneCard.vue";

  export default {
    name: 'trombi',
    components: {
      PersonneCard,
      CreationUtilisateur
    },
    data() {
      return {
        personnes: []
      }
    },
    methods: {
      loadPersons() {
        axios.get(process.env.API_PERSONNES_URL)
          .then(response => {
            this.personnes = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      }
    },
    mounted() {
      this.loadPersons();
    },
    created() {
      this.$on('some-refreshList', cardsListUpdated => {
        this.cards = cardsListUpdated;
      })
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
