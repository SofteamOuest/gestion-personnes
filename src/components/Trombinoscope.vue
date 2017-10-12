<template>
  <v-layout column>
    <v-flex xs12 sm12>
      <v-toolbar color="softeam-banner" dark>
        <v-toolbar-title class="menu-title">SOFTEAM Trombinoscope</v-toolbar-title>
        <v-spacer></v-spacer>
        <creation-utilisateur></creation-utilisateur>
        <v-btn icon class="menu-title">
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs${card.flex}`]: true }"
            v-for="card in cards"
            :key="card.title">
            <v-card>
              <v-card-media
                :src="card.src"
                height="400px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import CreationUtilisateur from "./CreationUtilisateur";

  export default {
    components: {CreationUtilisateur},
    data: () => ({
      cards: [
        {title: 'Pre-fab homes', src: '/static/photo1.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo2.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo3.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo4.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo5.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo6+.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo7.jpg', flex: 2},
        {title: 'Pre-fab homes', src: '/static/photo8.jpg', flex: 2},
      ]
    })
  }
</script>

<!-- Le scope CSS est partagé car composant parent -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .menu-title {
    color: #FFFFFF;
  }

  .softeam-banner {
    background: #323B42
  }
</style>
