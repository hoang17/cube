const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, '../client'),
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  entry: [
    'babel-polyfill',
    './entry-server.js'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
        // use: isProd
        //   ? ExtractTextPlugin.extract({
        //       use: 'css-loader?minimize',
        //       fallback: 'vue-style-loader'
        //     })
        //   : ['vue-style-loader', 'css-loader']
        // loader: "vue-style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        use: [ 'vue-style-loader', 'css-loader', 'stylus-loader' ]
        // use: isProd
        //   ? ExtractTextPlugin.extract({
        //       use: ['css-loader', 'stylus-loader'],
        //       fallback: 'vue-style-loader'
        //     })
        //   : ['vue-style-loader', 'css-loader', 'stylus-loader']
        // loader: "vue-style-loader!css-loader!stylus-loader",
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
    hints: false
  },
  // Avoids bundling external dependencies,
  // so node can load them directly from node_modules/
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins:
    isProd
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'process.env.VUE_ENV': '"server"'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),

        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: true,
        //   compress: { warnings: false },
        //   output: {comments: false}
        // }),

        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css',
          allChunks: true
        }),

        // It will search for CSS assets during the Webpack build and will optimize \ minimize
        // the CSS (by default it uses cssnano but a custom CSS processor can be specified)
        // Solves extract-text-webpack-plugin CSS duplication problem:
        // Since extract-text-webpack-plugin only bundles (merges) text chunks, if its used to bundle CSS,
        // the bundle might have duplicate entries (chunks can be duplicate free but when merged, duplicate CSS can be created).
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { discardComments: {removeAll: true } },
          canPrint: true
        }),

        new webpack.LoaderOptionsPlugin({
          minimize: true
        }),
        new VueSSRServerPlugin()
      ]
    : [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      }),
      new FriendlyErrorsPlugin(),
      new VueSSRServerPlugin()
    ]
}
