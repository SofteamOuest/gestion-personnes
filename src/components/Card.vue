<template>
  <div id="card">
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
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      personne: {
        type: Object,
        required: true
      }
    }
  }
</script>
