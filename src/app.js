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

  // set the current language for i18n.
  i18n.global.locale = language
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
