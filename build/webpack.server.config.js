const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const vueConfig = require('./vue-loader.config')

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, '../client'),
  devtool: '#source-map',
  entry: './entry-server.js',
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
    hints: false
  },
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  // externals: Object.keys(require('../package.json').dependencies),
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  // No need to put these behind a production env variable.
  plugins: [
    // Add the SSR plugin here.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new VueSSRServerPlugin()
  ]
}
