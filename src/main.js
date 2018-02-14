// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.config.debug = true

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

const messages = {
  en: {
    message: {
      menu: {
        title: 'SOFTEAM Digital'
      },
      add: {
        dialog: {
          title: 'Add new person'
        }
      },
      labels: {
        lastname: 'Lastname',
        firstname: 'Firstname',
        birthday: 'Birthday',
        job: 'Job',
        mail: {
          business: 'Business mail',
          personal: 'Personal Mail'
        },
        phone: {
          business: 'Business phone',
          personal: 'Personal phone'
        },
        comment: 'Comment',
        placeholder: {
          job: 'Developer/Sales Engineer',
          comment: 'I am comment'
        },
        mandatory: 'required field',
        format: {
          invalid: 'invalid format'
        }
      },
      mandatory: '* required fields',
      buttons: {
        add: 'Add',
        cancel: 'Cancel',
        remove: 'Remove',
        close: 'Close'
      }
    }
  },
  fr: {
    message: {
      menu: {
        title: 'SOFTEAM Digital'
      },
      add: {
        dialog: {
          title: 'Ajouter une nouvelle personne'
        }
      },
      labels: {
        lastname: 'Nom',
        firstname: 'Prénom',
        birthday: 'Date de naissance',
        job: 'Poste occupé',
        mail: {
          business: 'Email pro',
          personal: 'Email perso'
        },
        phone: {
          business: 'Téléphone pro',
          personal: 'Téléphone perso'
        },
        comment: 'Commentaire',
        placeholder: {
          job: 'Développeur/Consultant',
          comment: 'Je suis un commentaire'
        },
        mandatory: 'champ obligatoire',
        format: {
          invalid: 'format invalide'
        }
      },
      mandatory: '* champs obligatoires',
      buttons: {
        add: 'Ajouter',
        cancel: 'Annuler',
        remove: 'Supprimer',
        close: 'Fermer'
      }
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
