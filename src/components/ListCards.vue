<template>
  <div id="list-cards">
    <v-toolbar class="softeam-banner" dark>
      <v-toolbar-title class="menu-title">{{ $t('message.menu.title') }}</v-toolbar-title>
      <v-spacer/>
      <creation-person v-on:refreshList="refresh()"/>
      <v-btn icon class="menu-title">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-snackbar :bottom=true value="true" v-for="error in errors" :key="error.toString()">
      <v-icon class="mr-2" dark>error_outline</v-icon>
      <span>{{ error.toString() }}</span>
      <v-btn color="grey" flat @click.native="errors.splice(index,1)">Fermer</v-btn>
    </v-snackbar>

    <v-container fluid grid-list-md class="grey lighten-4">
      <v-layout row wrap>
        <v-flex xs6 sm4 md3 lg2 v-for="person in persons" :key="person.id" @click="idPersonSelected = person.id">
          <card :person="person" class="card-detail"></card>
        </v-flex>
      </v-layout>
    </v-container>
    <detail-person :id-person="idPersonSelected" v-on:refreshListAfterRemove="refresh()"
                   v-on:detailDialogClosed="dialogClosed()"/>
  </div>
</template>

<script>
import Card from './Card.vue'
import DetailPerson from './DetailPerson'
import CreationPerson from './CreationPerson'

import axios from 'axios'

export default {
  name: 'list-cards',
  components: {
    DetailPerson,
    Card,
    CreationPerson
  },
  data () {
    return {
      persons: [],
      idPersonSelected: null,
      errors: [],
      show: false, // display content after API request
      offset: 18, // items to display after scroll
      page: 1,
      trigger: 10, // how far from the bottom to trigger infinite scroll
      end: false // no more resources
    }
  },
  methods: {
    loadPersons () {
      const params = {_page: this.page, _limit: this.offset, _sort: 'nom'}
      axios.get(process.env.API_PERSONNES_URL, {params})
        .then(response => {
          this.persons = this.persons.concat(response.data)
        })
        .catch(
          error => {
            console.log(error)
            this.errors.push('Impossible de charger les utilisateurs')
          })
    },
    refresh () {
      this.loadPersons()
    },
    getIdPerson (event) {
      this.idPersonSelected = event
    },
    dialogClosed () {
      this.idPersonSelected = null
    },
    scroll () {
      window.onscroll = ev => {
        if (innerHeight + window.scrollY >= (document.body.offsetHeight - this.trigger)) {
          if (this.persons.length === this.page * this.offset) {
            this.page++
            this.loadPersons()
          }
        }
      }
    }
  },
  mounted () {
    this.scroll()
    this.loadPersons()
  }
}
</script>

<style scoped>
  .card-detail {
    cursor: pointer;
  }

  .menu-title {
    color: #FFFFFF;
  }

  .softeam-banner {
    background: #323B42
  }
</style>
