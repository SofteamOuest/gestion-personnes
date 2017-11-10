<template>
  <div id="detail-personne">
    <v-card>
      <v-card-title>
        <div class="headline">Ajouter une nouvelle personne</div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import VueAxios from 'vue-axios';

  export default {
    name: 'detail-personne',
    methods: {}
  }
</script>

<!-- Le scope CSS est isolé et uniquement disponible pour ce composant -->
<style scoped>

  #upload-file {
    text-align: center;
  }

</style>
