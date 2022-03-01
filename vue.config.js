module.exports = {
  lintOnSave: false,
  css: {
    extract: false
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-tabs-chrome/'
    : '/',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.module.rule('ts').uses.delete('cache-loader');
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(options => ({
          ...options,
          transpileOnly: false,
          happyPackMode: false
        }));
      config.output.libraryExport = 'default';
    }
  },
  parallel: false
}
