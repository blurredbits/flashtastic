const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, './src/app.js')
    ]
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3001,
      open: false,
      server: {
        baseDir: ['./', './build']
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exlude: /node_modules/, loader: 'babel', include: path.join(__dirname, 'src') }
    ]
  }
}