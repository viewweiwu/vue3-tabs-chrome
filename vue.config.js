module.exports = {
  lintOnSave: false,
  css: {
    extract: false
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-tabs-chrome/'
    : '/'
}
