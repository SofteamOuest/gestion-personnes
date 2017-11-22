<template>
  <div id="card">
    <v-card>
      <v-card-media v-on:click="showDialog(person.id)"
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
    },
    data() {
      return {
        person: null
      }
    },
    methods: {
      showDialog(idPerson) {
        console.log("envoi évenement openDetailDialog");
        this.idPerson = idPerson;
        this.$emit('openDetailDialog', this.idPerson);
      }
    }
  }
</script>

<style scoped>
</style>

