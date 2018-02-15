<template>
  <div id="card">
    <v-card>
      <v-card-media :src="person.photo" height="400px" contain v-if="person.photo != null"/>
      <v-card-media :src="defaultImage" height="400px" contain v-else/>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ person.nom }} {{ person.prenom }}</div>
          <span class="grey--text">{{ person.poste }}</span>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultImage: "/static/anonyme.png"
    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
