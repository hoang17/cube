const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'

const version = require('./version')()

module.exports = {
  target: 'node',
  node: {
    __dirname: false
  },
  context: path.resolve(__dirname, '../'),
  devtool: false,
  entry: [
    'babel-polyfill',
    './server.js'
  ],
  output: {
    path: path.resolve(__dirname, '../../deploy'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js','.json'],
    // alias: {
    //   'public': path.resolve(__dirname, '../public')
    // }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  performance: {
    hints: false
  },
  // Avoids bundling external dependencies,
  // so node can load them directly from node_modules/
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
