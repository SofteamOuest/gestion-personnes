<template>
  <div id="creation-person">
    <v-dialog v-model="creationDialog" persistent max-width="800px">

      <v-btn icon class="menu-title" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>

      <v-card>

        <v-snackbar :bottom=true value=true v-for="(error,index) in errors" :key="error.toString()">
          <v-icon class="mr-2" dark>error_outline</v-icon>
          <span>{{ error.toString() }}</span>
          <v-btn color="grey" flat @click.native="errors.splice(index,1)">Fermer</v-btn>
        </v-snackbar>

        <v-form v-model="valid" ref="form" lazy-validation>

          <v-card-title>
            <div class="headline">{{ $t('message.add.dialog.title') }}</div>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!-- Ligne Nom/Prenom-->
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.lastname')" v-model="person.lastname" required :rules="requiredFields"
                                placeholder="Dupond"/>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.firstname')" v-model="person.firstname" required :rules="requiredFields"
                                placeholder="Jean"/>
                </v-flex>

                <!-- Ligne Date de naissance / Poste occupé-->
                <v-flex xs12 sm6 md6>
                  <v-menu lazy :close-on-content-click="false" transition="scale-transition"
                          offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                    <v-text-field slot="activator" :label="$t('message.labels.birthday')" v-model="dateFormatted"
                                  prepend-icon="event" readonly required :rules="requiredFields" placeholder="10/10/2010"/>
                    <v-date-picker v-model="person.birthday" @input="dateFormatted = formatDate(person.birthday)" no-title scrollable actions locale="fr-fr"
                                   :date-format="d=>new Date(d)-0">
                      <v-card-actions slot-scope="{ save, cancel }">
                        <v-spacer/>
                        <v-btn flat color="primary" @click="cancel">Retour</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.job')" v-model="person.work" prepend-icon="work" required
                                :rules="requiredFields" :placeholder="$t('message.labels.placeholder.job')"/>
                </v-flex>

                <!-- Ligne Email pro / Telephone pro -->
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.mail.business')" v-model="person.mail_pro" prepend-icon="mail" required
                                :rules="requiredFields && emailFields" placeholder="jean.dupond@softeam.fr"/>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.phone.business')" v-model="person.phone_pro" prepend-icon="phone"
                                :rules="telephoneFields" placeholder="00 00 00 00 00"/>
                </v-flex>

                <!-- Ligne Email perso / Telephone perso -->
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.mail.personal')" v-model="person.mail_perso" prepend-icon="mail"
                                :rules="emailFields" placeholder="jean.dupond@email.fr"/>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field :label="$t('message.labels.phone.personal')" v-model="person.phone_perso"
                                prepend-icon="phone" :rules="telephoneFields" placeholder="00 00 00 00 00"/>
                </v-flex>

                <!-- Ligne Photo avec miniature -->
                <v-flex xs12>
                  <v-icon>add_a_photo</v-icon>
                </v-flex>

                <!-- Ligne Commentaire -->
                <v-flex xs12>
                  <v-text-field :label="$t('message.labels.comment')" v-model="person.comment"
                                :placeholder="$t('message.labels.placeholder.comment')" :counter="1024" multi-line/>
                </v-flex>

              </v-layout>
            </v-container>
            <small>{{ $t('message.mandatory') }}</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click.native="clear()">{{ $t('message.buttons.cancel') }}</v-btn>
            <v-btn color="primary" flat @click.native="submit()" :disabled="!valid">{{ $t('message.buttons.add') }}
            </v-btn>
          </v-card-actions>

        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreationPerson',
  data () {
    return {
      valid: true,
      creationDialog: false,
      person: {
        lastname: '',
        firstname: '',
        birthday: null,
        mail_pro: '',
        mail_perso: '',
        phone_pro: '',
        phone_perso: '',
        work: '',
        comment: ''
      },
      requiredFields: [v => !!v || this.$t('message.labels.mandatory')],
      emailFields: [
        v =>
          /(^\s*$|([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$))/.test(v) ||
          this.$t('message.labels.format.invalid')
      ],
      telephoneFields: [
        v =>
          /(^\s*$|(^[0-9]{10})$)/.test(v) ||
          this.$t('message.labels.format.invalid')
      ],
      errors: [],
      dateFormatted: ''
    };
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios
          .post(process.env.API_PERSONNES_URL, {
            nom: this.person.lastname,
            prenom: this.person.firstname,
            date_de_naissance: this.person.birthday,
            photo: null,
            mail_pro: this.person.mail_pro,
            mail_perso: this.person.mail_perso,
            tel_pro: this.person.phone_pro,
            tel_perso: this.person.phone_perso,
            poste: this.person.work,
            description_libre: this.person.comment
          })
          .then(response => {
            this.$emit('refreshList', response.data);
            this.clear();
          })
          .catch(error => {
            console.log(error);
            this.errors.push('Impossible de sauvegarder la nouvelle personne');
          });
      }
    },
    clear () {
      this.creationDialog = false;
      this.$refs.form.reset();
    },
    formatDate (date) {
      return this.$options.filters['formatDate'](date);
    }
  }
};
</script>

<style scoped>

</style>
