const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

const clientDistPath = './dist/client';
server.use('/img', express.static(path.join(__dirname, clientDistPath, 'img')))
server.use('/js', express.static(path.join(__dirname, clientDistPath, 'js')))
server.use('/css', express.static(path.join(__dirname, clientDistPath, 'css')))
server.use('/media', express.static(path.join(__dirname, clientDistPath, 'media')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, clientDistPath, 'favicon.ico'))
)

server.get('*', async (req, res) => {
  const { app } = await createApp()

  const appContent = await renderToString(app)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    html = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`You can navigate to http://localhost:${port}`);
});