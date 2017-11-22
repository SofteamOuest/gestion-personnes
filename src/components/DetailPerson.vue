<template>
  <div id="detail-person">
    <v-dialog v-model="showDetailDialog" persistent max-width="800px">
      <v-card>
        <v-card-media
          :src="detailPerson.photo"
          style="height: 400px">
        </v-card-media>
        <v-card-title class="headline">Personne :: {{idPerson}}</v-card-title>
        <v-btn color="blue darken-1" flat @click.native="clear()">{{ $t('message.buttons.cancel') }}</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  import axios from 'axios';
  import VueAxios from 'vue-axios';

  export default {
    name: "detail-person",
    props: [
      'idPerson'
    ],
    data() {
      return {
        detailPerson: [],
        showDetailDialog: true
      }
    },
    watch: {
      idPerson: (value) => {
        console.log('watch :: ' + value);
        console.log('Presque');
        axios.get(process.env.API_PERSONNES_URL + value)
          .then(response => {
            console.log('Gagné');
            this.detailPerson = response.data;
            this.showDetailDialog = true;
          })
          .catch(
            error => {
              console.log(error)
            });
      }
    },
    methods: {
      loadPersonById(id) {
        console.log('Presque');
        axios.get(process.env.API_PERSONNES_URL + id)
          .then(response => {
            console.log('Gagné');
            this.showDetailDialog = true;
            this.detailPerson = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      },
      clear() {
        this.showDetailDialog = false;
      }
    }
  }
</script>

<style scoped>

</style>
