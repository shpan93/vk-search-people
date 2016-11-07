const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: './',
  publicPath: '/',
  hot:true,
  historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:8080/');
});
