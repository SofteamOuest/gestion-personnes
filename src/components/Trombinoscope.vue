<template>
  <div id="trombi">
    <v-layout column>
      <v-flex xs12 sm12>
        <v-toolbar color="softeam-banner" dark>
          <v-toolbar-title class="menu-title">SOFTEAM Trombinoscope</v-toolbar-title>
          <v-spacer></v-spacer>
          <creation-personne v-on:refreshList="refresh($event)"></creation-personne>
          <v-btn icon class="menu-title">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid grid-list-md class="grey lighten-4">
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs2`]: true }"
              v-for="personne in personnes"
              :key="personne.id" @click="charger">
              <carte-personne :personne="personne"></carte-personne>
            </v-flex>
          </v-layout>
        </v-container>
        <detail-personne v-if="dialogDetail"></detail-personne>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import CreationPersonne from "./CreationPersonne"
  import CartePersonne from "./CartePersonne.vue";
  import DetailPersonne from "./DetailPersonne.vue";

  import axios from 'axios';
  import VueAxios from 'vue-axios';

  export default {
    name: 'trombi',
    components: {
      CartePersonne,
      CreationPersonne,
      DetailPersonne
    },
    data() {
      return {
        personnes: [],
        dialogDetail: true
      }
    },
    methods: {
      listerPersonnes() {
        axios.get(process.env.API_PERSONNES_URL)
          .then(response => {
            this.personnes = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      },
      refresh(event) {
        this.listerPersonnes();
      },
      charger() {
        console.log('test ');
        this.dialogDetail = true;
      }
    },
    mounted() {
      this.listerPersonnes();
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
