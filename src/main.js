// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

Vue.use(Vuetify);
Vue.use(VueI18n);

Vue.config.productionTip = false;
Vue.config.debug = true;

const messages = {
  en: {
    message: {
      menu: {
        title: 'SOFTEAM Digital'
      },
      add: {
        dialog: {
          title: 'Add new person',
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
        comment: 'Comment'
      },
      mandatory: '* required fields',
      buttons: {
        add: 'Add',
        cancel: 'Cancel'
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
        comment: 'Commentaire'
      },
      mandatory: '* champs obligatoires',
      buttons: {
        add: 'Ajouter',
        cancel: 'Annuler'
      }
    }
  }
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});
