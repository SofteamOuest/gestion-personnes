<template>
  <div id="list-cards">
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
          <card :person="person" :id-person="person.id" v-on:getIdPersonParam="getIdPerson($event)"
                class="card-detail"></card>
        </v-flex>
      </v-layout>
    </v-container>
    <detail-person :id-person="idPerson" v-on:refreshListAfterRemove="refresh($event)"></detail-person>
  </div>
</template>

<script>
  import Card from "./Card.vue";
  import DetailPerson from "./DetailPerson";
  import CreationPerson from "./CreationPerson"

  import axios from 'axios';
  import VueAxios from 'vue-axios';


  export default {
    name: "list-cards",
    components: {
      DetailPerson,
      Card,
      CreationPerson
    },
    data() {
      return {
        persons: [],
        dialogDetail: false,
        idPerson: null
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
      },
      getIdPerson(event) {
        this.idPerson = event;
      }
    },
    mounted() {
      this.loadPersons();
    }
  }
</script>

<style scoped>

  .card-detail {
    cursor: pointer;
  }

</style>
