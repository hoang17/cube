const express = require('express')
const path = require('path')
const LRU = require('lru-cache')
const chalk = require('chalk')

const isProd = process.env.NODE_ENV === 'production'

module.exports = function(app) {

  const resolve = file => path.resolve(__dirname, file)

  const { createBundleRenderer } = require('vue-server-renderer')

  // const pug = require('pug')
  // const template = pug.renderFile(resolve('./views/layout.pug'), {title: 'Vue 2.0', messages:[]})
  // const template = fs.readFileSync(resolve('./client/index.template.html'), 'utf-8')

  let bundle
  let options
  let readyPromise
  let renderer

  if (isProd) {
    // In production: create server renderer using built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    bundle = require('./dist/vue-ssr-server-bundle.json')
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    options = { clientManifest }
  } else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('./build/setup-dev-server')(app, (bu, op) => {
      bundle = bu
      options = op
    })
  }

  const cache = LRU({ max: 1000, maxAge: 1000 * 60 * 15 })
  const basedir = resolve('./dist')

  function createRenderer(req, res, template) {
    renderer = createBundleRenderer(bundle, Object.assign(options, { template, cache,
      basedir, // this is only needed when vue-server-renderer is npm-linked
      runInNewContext: false // recommended for performance
    }))
    isProd
      ? render(req, res)
      : readyPromise.then(() => render(req, res))
  }

  // 1-second microcache.
  // https://www.nginx.com/blog/benefits-of-microcaching-nginx/

  const useMicroCache = process.env.MICRO_CACHE !== 'false'
  const microCache = LRU({
    max: 100,
    maxAge: 1000
  })

  // since this app has no user-specific content, every page is micro-cacheable.
  // if your app involves user-specific content, you need to implement custom
  // logic to determine whether a request is cacheable based on its url and headers.
  const isCacheable = req => useMicroCache

  function render (req, res) {
    const s = Date.now()

    const handleError = err => {
      if (err && err.code === 404) {
        res.status(404).end('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).end('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
    }

    const cacheable = isCacheable(req)
    if (cacheable) {
      const hit = microCache.get(req.url)
      if (hit) {
        if (!isProd) {
          console.log(chalk.blue(`cache hit! whole request: ${Date.now() - s}ms`))
        }
        return res.end(hit)
      }
    }

    const context = {
      title: 'Vue 2.0', // default title
      url: req.url
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      res.end(html)
      if (cacheable) {
        microCache.set(req.url, html)
      }
      if (!isProd) {
        console.log(chalk.red(`whole request: ${Date.now() - s}ms`))
      }
    })
  }

  app.get('/groups/:page?', (req, res) => {
    res.render('template', {title: 'Groups'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/likes/:page?', (req, res) => {
    res.render('template', {title: 'Likes'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/pages/:page?', (req, res) => {
    res.render('template', {title: 'Pages'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/friends/:page?', (req, res) => {
    res.render('template', {title: 'Friends'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/feeds/:page?', (req, res) => {
    res.render('template', {title: 'Feeds'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/groups/id/:id/:page?', (req, res) => {
    res.render('template', {title: 'Groups'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/likes/id/:id/:page?', (req, res) => {
    res.render('template', {title: 'Likes'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  app.get('/pages/id/:id/:page?', (req, res) => {
    res.render('template', {title: 'Pages'}, (err, template) => {
      createRenderer(req, res, template)
    })
  })

  // Serve static assets
  const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  })

  app.use('/dist', serve('./dist', true))
  app.use('/manifest.json', serve('./manifest.json', true))
  app.use('/service-worker.js', serve('./dist/service-worker.js'))
}
