import { createI18n } from 'vue-i18n'

/**
 * Load locale messages
 */

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    
    if (matched && matched.length > 1) {
      const locale = matched[1]
      
      messages[locale] = locales(key)
    }
  })

  return messages
}

// Detect browser language
function getBrowserLocale() {
  const browserLang = navigator.language || navigator.userLanguage
  const lang = browserLang.split('-')[0] // 'en-US' → 'en'
  
  // Check if we support this language
  return ['en', 'ru'].includes(lang) ? lang : 'en'
}

// Use browser language or fallback to English
const defaultLocale = typeof window !== 'undefined' 
  ? getBrowserLocale() 
  : 'en'

let i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
  warnHtmlMessage: false,
  globalInjection: true
})

export default i18n
