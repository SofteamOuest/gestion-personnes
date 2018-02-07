<template>
  <div id="detail-person">
    <v-dialog v-model="showDetailDialog" max-width="800px">
      <v-layout row wrap>
        <v-flex xs7>
          <v-card color="" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <v-container fill-height>
                    <v-layout row wrap align-center>
                      <v-flex>
                        <v-list two-line>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon>work</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.poste}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.job')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon>mail</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.mail_pro}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.mail.business')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile v-if="detailPerson.tel_pro">
                            <v-list-tile-action>
                              <v-icon>phone</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.tel_pro ? detailPerson.tel_pro : '--'}}
                              </v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.phone.business')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>

                          <v-divider inset/>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon>cake</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.date_de_naissance | formatDate}}</v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.birthday')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile v-if="detailPerson.mail_perso">
                            <v-list-tile-action>
                              <v-icon>email</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.mail_perso ? detailPerson.mail_perso : '--'}}
                              </v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.mail.personal')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile v-if="detailPerson.tel_perso">
                            <v-list-tile-action>
                              <v-icon>smartphone</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>{{detailPerson.tel_perso ? detailPerson.tel_perso : '--'}}
                              </v-list-tile-title>
                              <v-list-tile-sub-title>{{$t('message.labels.phone.personal')}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>

            </v-container>
            <v-card-actions>
              <v-spacer/>
              <v-btn flat @click.native="clear()">
                <span>{{$t('message.buttons.close')}}</span>
              </v-btn>
              <v-btn flat color="error" dark @click.native="remove(detailPerson.id)">
                <span>{{ $t('message.buttons.remove')}}</span>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs5>
          <v-container fill-height :style="{background : detailPerson.color}">
            <v-layout row wrap align-center>
              <v-flex class="text-xs-center">
                <v-avatar size=400 class="grey lighten-4">
                  <img :src="detailPerson.photo" alt="avatar" v-if="detailPerson.photo != null">
                  <img :src="defaultImage" alt="avatar" v-else>
                </v-avatar>
                <v-card-title primary-title wrap align-center>
                  <v-container fill-width align="center">
                    <div class="headline">{{detailPerson.nom}} {{detailPerson.prenom}}</div>
                    <p class="subheading grey--text text--darken-1">{{detailPerson.description_libre}}</p>
                  </v-container>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'
import colors from 'vuetify/es5/util/colors'

export default {
  name: 'detail-person',
  props: {
    idPerson: {
      type: Number
    }
  },
  data () {
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
      handler (id) {
        if (id) {
          this.loadPersonById(id)
        }
      },
      deep: true
    },
    showDetailDialog: {
      handler (visible) {
        if (!visible) {
          this.$emit('detailDialogClosed')
        }
      }
    }
  },
  methods: {
    loadPersonById (id) {
      axios.get(process.env.API_PERSONNES_URL + id)
        .then(response => {
          this.showDetailDialog = true
          this.detailPerson = response.data
          this.detailPerson.color = this.getRandomColor()
        })
        .catch(
          error => {
            console.log(error)
          })
    },
    clear () {
      this.showDetailDialog = false
    },
    remove (id) {
      axios.delete(process.env.API_PERSONNES_URL + id)
        .then(response => {
          this.showDetailDialog = false
          this.$emit('refreshListAfterRemove', response.data)
        })
        .catch(
          error => {
            console.log(error)
          })
    },
    getRandomColor () {
      const randomIndex = Math.floor(Math.random() * Math.floor(Object.values(colors).length - 1))
      const randomColor = Object.values(colors)[randomIndex]
      return randomColor.lighten5
    }
  }
}
</script>

<style scoped>
  .avatar-background {
    background: dimgray;
  }
</style>
