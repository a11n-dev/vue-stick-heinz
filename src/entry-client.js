import createApp from './app'

// client-specific bootstrapping logic...

const { app, router } = createApp({
  // here we can pass additional arguments to app factory
})

// this assumes App.vue template root element has `id="app"`
router.isReady().then(() => {
  app.mount('#app', true)
})