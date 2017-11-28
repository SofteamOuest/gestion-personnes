<template>
  <div id="detail-person">
    <v-dialog v-model="showDetailDialog" persistent max-width="800px">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="orange darken-2" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div class="headline">
                    {{detailPerson.prenom}} {{detailPerson.nom}}
                  </div>
                  <div class="row">
                    <span>{{$t('message.labels.birthday')}}</span>
                    <span>{{detailPerson.date_de_naissance}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.job')}}</span>
                    <span>{{detailPerson.poste}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.mail.business')}}</span>
                    <span>{{detailPerson.mail_pro}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.phone.business')}}</span>
                    <span>{{detailPerson.mail_perso}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.mail.personal')}}</span>
                    <span>{{detailPerson.tel_pro}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.phone.personal')}}</span>
                    <span>{{detailPerson.tel_perso}}</span>
                  </div>
                  <div>
                    <span>{{$t('message.labels.comment')}}</span>
                    <span>{{detailPerson.description_libre}}</span>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media :src="detailPerson.photo" height="400px" contain
                                v-if="detailPerson.photo != null"></v-card-media>
                  <v-card-media :src="this.defaultImage" height="400px" contain v-else></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn class="white--text" flat @click.native="clear()">{{ $t('message.buttons.cancel') }}</v-btn>
              <v-btn class="white--text" flat @click.native="remove(detailPerson.id)">{{ $t('message.buttons.remove')
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
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
        showDetailDialog: false,
        defaultImage: '/static/anonyme.png',
        requiredFields: [(v) => !!v || this.$t('message.labels.mandatory')],
        emailFields: [(v) => /(^\s*$|([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$))/.test(v) || this.$t('message.labels.format.invalid')],
        telephoneFields: [(v) => /(^\s*$|(^[0-9]{10})$)/.test(v) || this.$t('message.labels.format.invalid')]
      }
    },
    watch: {
      idPerson: {
        handler(value) {
          this.loadPersonById(value);
        },
        deep: true
      }
    },
    methods: {
      loadPersonById(id) {
        axios.get(process.env.API_PERSONNES_URL + id)
          .then(response => {
            this.showDetailDialog = true;
            this.detailPerson = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      }
      ,
      clear() {
        this.showDetailDialog = false;
      },
      remove(id) {
        axios.delete(process.env.API_PERSONNES_URL + id)
          .then(response => {
            this.showDetailDialog = false;
            this.$emit('refreshListAfterRemove', response.data)
          })
          .catch(
            error => {
              console.log(error)
            });
      }
    }
  }
</script>

<style scoped>

</style>
