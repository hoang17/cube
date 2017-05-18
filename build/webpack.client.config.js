const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const config = merge(base, {
  entry: {
    main: './client/main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
})

module.exports = config
