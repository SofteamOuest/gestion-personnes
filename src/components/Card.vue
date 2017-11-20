<template>
  <div id="card">
    <v-card>
      <v-card-media
        :src="person.photo"
        style="height: 400px">
      </v-card-media>
      <v-card-title>
        <div>
          <span v-text="this.person.nom + ' ' + this.person.prenom"></span>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      person: {
        type: Object,
        required: true
      }
    }
  }
</script>
