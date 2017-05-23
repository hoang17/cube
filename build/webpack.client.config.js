const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const vueConfig = require('./vue-loader.config')

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '../client'),
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      './main.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js'
    // filename: isProd ? '[name].[chunkhash].js' :'[name].js'
  },
  // watch: isProd ? false : true,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
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
        loader: "style-loader!css-loader"
        // use: isProd
        //   ? ExtractTextPlugin.extract({
        //       use: 'css-loader?minimize'
        //     })
        //   : 'style-loader!css-loader'
      },
      {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      // {
      //   test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader'
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      // }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|html|css)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
