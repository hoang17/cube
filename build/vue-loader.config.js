const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  extractCSS: isProd,
  preserveWhitespace: false,
  cssModules: {
    modules: true,
    importLoaders: true,
    sourceMap: false,
    camelCase: true,
    localIdentName: isProd
      ? '[hash:base64:5]'
      : '[local]_[hash:base64:5]',
      // : '[name]-[local]-[hash:base64:5]',
    minimize: true,
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
}
