const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '../client'),
  devtool: isProd ? false : '#cheap-module-source-map',
  entry: {
    app: [
      'babel-polyfill',
      './entry-client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    // filename: '[name].js'
    filename: isProd ? '[name].[chunkhash].js' :'[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "vue-style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        loader: "vue-style-loader!css-loader!stylus-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env.VUE_ENV': '"client"'
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          output: {comments: false}
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module) {
            // a module is extracted into the vendor chunk if...
            return (
              // it's inside node_modules
              /node_modules/.test(module.context) &&
              // and not a CSS file (due to extract-text-webpack-plugin limitation)
              !/\.css$/.test(module.request)
            )
          }
        }),
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest'
        }),
        new VueSSRClientPlugin(),
        new SWPrecachePlugin({
          cacheId: 'vue-hn',
          filename: 'service-worker.js',
          minify: true,
          dontCacheBustUrlsMatching: /./,
          staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
          // mergeStaticsConfig: true,
          // staticFileGlobs: [
          //   "public/**/*.{html,js,css}",
          //   "public/fonts/**",
          //   "public/logo/**",
          //   "public/css/**.css",
          //   "public/js/lib/**.js",
          //   "dist/**.css",
          //   "dist/**.js"
          // ],
          runtimeCaching: [
            {
              urlPattern: '/',
              handler: 'networkFirst'
            },
            {
              urlPattern: /\/(groups|likes|pages|friends|feeds)/,
              handler: 'networkFirst'
            },
            {
              urlPattern: '/item/:id',
              handler: 'networkFirst'
            },
            {
              urlPattern: '/user/:id',
              handler: 'networkFirst'
            }
          ]
        })
      ]
    : [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.VUE_ENV': '"client"'
        }),
        new FriendlyErrorsPlugin(),
        new VueSSRClientPlugin()
      ]
}
