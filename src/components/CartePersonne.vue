<template>
  <v-card>
    <v-card-media
      :src="personne.photo"
      style="height: 400px">
    </v-card-media>
    <v-card-title>
      <div>
        <span v-text="this.personne.nom + ' ' + this.personne.prenom"></span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: 'carte-personne',
    props: {
      personne: {
        type: Object,
        required: true
      }
    }
  }
</script>
