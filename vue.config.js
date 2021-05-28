/* eslint-disable-next-line import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devServer: {
    before: (app) => {
      app.set('etag', 'strong');
      app.use((req, res, next) => {
        res.set('Cache-Control', 'must-revalidate');
        next();
      });
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true,
      });
    config.plugins
      .delete('prefetch');
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new StyleLintPlugin({
        context: 'src',
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        fix: true,
      }),
    ],
    output: {
      filename: (process.env.NODE_ENV === 'production') ? '[name].[chunkhash:8].js' : '[name].[hash].js',
    },
  },
};
