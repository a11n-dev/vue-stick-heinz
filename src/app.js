import { createSSRApp, createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPause, faPlay, faVolumeMute, faVolumeUp, faVolumeDown } from "@fortawesome/free-solid-svg-icons";

library.add(faPause, faPlay, faVolumeMute, faVolumeUp, faVolumeDown);

// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {

  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = 'ru'
  }

  // set the current language for i18n (Composition API mode)
  i18n.global.locale.value = language
  
  // Close all overlays and popups when navigating between pages
  if (typeof window !== 'undefined') {
    const menubg = document.getElementById('menubg')
    const popupLangs = document.querySelector('.popup-langs')
    const menu = document.querySelector('.menu')
    
    if (menubg) {
      menubg.classList.remove('fade-in')
    }
    if (popupLangs) {
      popupLangs.classList.remove('opened')
    }
    if (menu) {
      menu.classList.remove('opened')
    }
  }
  
  next()
})

const isSSR = typeof window === 'undefined';

export default function () {
  const app = (isSSR ? createSSRApp(App) : createApp(App));

  app.use(router);
  app.use(i18n);
  app.component("font-awesome-icon", FontAwesomeIcon)

  return {
    app,
    router,
    i18n
  };
}
