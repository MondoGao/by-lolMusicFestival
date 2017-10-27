const webpack = require('webpack');
const { smart } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const { publicPath, port } = require('../settings');

module.exports = smart(baseConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      'whatwg-fetch',
      './src/index.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    port,
    publicPath,
    hot: true,
    contentBase: './dist',
    host: '0.0.0.0',
    compress: true,
  },
});

