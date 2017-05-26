const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '../client'),
  devtool: isProd ? false : '#cheap-module-source-map',
  entry: {
    app: './entry-client.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js'
    // filename: isProd ? '[name].[chunkhash].js' :'[name].js'
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
          filename: 'common.css'
        }),
        new VueSSRClientPlugin()
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
