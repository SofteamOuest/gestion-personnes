<template>
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
              <v-text-field label="Nom" v-model="personne.nom" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Prénom" v-model="personne.prenom" required></v-text-field>
            </v-flex>

            <!-- Ligne Date de naissance / Poste occupé-->
            <v-flex xs12 sm6 md6>
              <v-text-field label="Date de Naissance" v-model="personne.dateNaissance" prepend-icon="date_range"
                            required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Poste occupé" v-model="personne.poste" prepend-icon="event_seat"
                            required></v-text-field>
            </v-flex>

            <!-- Ligne Email pro / Telephone pro -->
            <v-flex xs12 sm6 md6>
              <v-text-field label="Email pro" v-model="personne.emailPro" prepend-icon="mail" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Téléphone pro" v-model="personne.telephonePro" prepend-icon="phone"
                            required></v-text-field>
            </v-flex>

            <!-- Ligne Email perso / Telephone perso -->
            <v-flex xs12 sm6 md6>
              <v-text-field label="Email perso" v-model="personne.emailPerso" prepend-icon="mail"
                            required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="Téléphone perso" v-model="personne.telephonePerso" prepend-icon="phone"
                            required></v-text-field>
            </v-flex>

            <!-- Ligne Photo avec miniature -->
            <v-flex xs12>
              <v-icon>add_a_photo</v-icon>
            </v-flex>

            <!-- Ligne Commentaire -->
            <v-flex xs12>
              <v-text-field label="Commentaire" v-model="personne.commentaire" multi-line></v-text-field>
            </v-flex>

          </v-layout>
        </v-container>
        <small>* champs obligatoires</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Retour</v-btn>
        <v-btn color="blue darken-1" flat @click.native="ajouterNouvellePersonne();dialog = false">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        image: '',
        personne: {}
      }
    },
    methods: {
      ajouterNouvellePersonne() {
        console.log('ajouterNouvellePersonne :: ' + this.personne);
      }
    }
  }
</script>

<!-- Le scope CSS est isolé et uniquement disponible pour ce composant -->
<style scoped>

  #upload-file {
    text-align: center;
  }

</style>
