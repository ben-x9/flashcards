var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    index: ['./app/core/index'],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  externals: {
    'firebase': 'firebase',
    'immutable': 'immutable'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    root: [path.resolve('./app')]
  },
  devtool: '#eval',
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      // exclude: /node_modules/,
    }],
  },
  ts: {
    transpileOnly: true,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    debug: true,
    devtool: 'cheap-module-eval-source-map'
  }
};