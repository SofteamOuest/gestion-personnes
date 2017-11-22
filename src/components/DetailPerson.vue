<template>
  <div id="detail-person">
    <v-dialog v-model="showDetailDialog" persistent max-width="800px">
      <v-card>
        <!--<v-card-media
          :src="detailPerson.photo"
          style="height: 400px">
        </v-card-media>-->
        <v-card-title class="headline">Use Google's location service + {{idPerson}}?</v-card-title>
        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>
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
      'showDetailDialog',
      'idPerson'
    ],
    data() {
      return {
        detailPerson: []
      }
    },
    methods: {
      loadPersonById() {
        console.log('Presque');
        axios.get(process.env.API_PERSONNES_URL + this.idPerson)
          .then(response => {
            console.log('Gagné');
            this.detailPerson = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      },
      clear() {
        console.log("envoi évenement closeModale");
        this.showDetailDialog = false;
        this.$emit('closeDetailDialog', this.showDetailDialog);
      }
    },
    mounted() {
      this.loadPersonById();
    }
  }
</script>

<style scoped>

</style>
