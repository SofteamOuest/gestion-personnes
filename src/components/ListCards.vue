<template>
  <div id="list-cards">
    <v-container fluid grid-list-md class="grey lighten-4">
      <v-layout row wrap>
        <v-flex
          v-bind="{ [`xs2`]: true }"
          v-for="person in persons"
          :key="person.id">
          <card :person="person" :id-person="person.id" v-on:getIdPersonParam="getIdPerson($event)"></card>
        </v-flex>
        <detail-person :id-person="idPerson"></detail-person>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Card from "./Card.vue";
  import DetailPerson from "./DetailPerson";

  import axios from 'axios';
  import VueAxios from 'vue-axios';


    export default {
      name: "list-cards",
      components: {
        DetailPerson,
        Card
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
          console.log('getIdPerson :: ' + event);
          this.idPerson = event;
        }
      },
      mounted() {
        this.loadPersons();
      }
    }
</script>

<style scoped>

</style>
