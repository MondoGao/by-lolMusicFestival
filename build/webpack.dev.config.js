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
        test: [
          /\.global\.css$/,
          /node_modules.*\.css$/,
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
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

