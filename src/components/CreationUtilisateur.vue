<template>
  <div id="create-person">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn icon class="menu-title" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Ajouter une nouvelle personne</div>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <!-- Ligne Nom/Prenom-->
              <v-flex xs12 sm6 md6>
                <v-text-field label="Nom" v-model="person.lastname" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Prénom" v-model="person.firstname" required></v-text-field>
              </v-flex>

              <!-- Ligne Date de naissance / Poste occupé-->
              <v-flex xs12 sm6 md6>
                <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition"
                  offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" >
                  <v-text-field slot="activator" label="Date de naissance" v-model="person.birthday"
                                prepend-icon="event" readonly required></v-text-field>
                  <v-date-picker v-model="person.birthday" no-title scrollable actions locale="fr-fr">
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Retour</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Poste occupé" v-model="person.work" prepend-icon="event_seat"
                              required></v-text-field>
              </v-flex>

              <!-- Ligne Email pro / Telephone pro -->
              <v-flex xs12 sm6 md6>
                <v-text-field label="Email pro" v-model="person.mail_pro" prepend-icon="mail" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Téléphone pro" v-model="person.phone_pro" prepend-icon="phone"></v-text-field>
              </v-flex>

              <!-- Ligne Email perso / Telephone perso -->
              <v-flex xs12 sm6 md6>
                <v-text-field label="Email perso" v-model="person.mail_perso" prepend-icon="mail"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Téléphone perso" v-model="person.phone_perso" prepend-icon="phone"></v-text-field>
              </v-flex>

              <!-- Ligne Photo avec miniature -->
              <v-flex xs12>
                <v-icon>add_a_photo</v-icon>
              </v-flex>

              <!-- Ligne Commentaire -->
              <v-flex xs12>
                <v-text-field label="Commentaire" v-model="person.comment" multi-line></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>* champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Retour</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addPerson();dialog = false">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import VueAxios from 'vue-axios';

  export default {
    name: 'create-person',
    data() {
      return {
        dialog: false,
        person: {}
      }
    },
    methods: {
      addPerson() {
        axios.post(`http://localhost:3000/api/personnes/`, {
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
            this.cards = response.data;
          })
          .catch(
            error => {
              console.log(error)
            });
      }
    },
    create() {
      this.addPerson();
    }
  }
</script>

<!-- Le scope CSS est isolé et uniquement disponible pour ce composant -->
<style scoped>

  #upload-file {
    text-align: center;
  }

</style>
