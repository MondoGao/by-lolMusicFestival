const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const { publicPath } = require('../settings');

module.exports = {
  context: resolve(__dirname, '../'),

  entry: {
    index: './src/index.js',
    vendor: [
      'ramda',
    ],
  },

  output: {
    publicPath,
    filename: 'scripts/[name].[hash].js',
    path: resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gif|ico|svg)/,
        loader: 'url-loader',
        options: {
          limit: 128,
          context: resolve(__dirname, '../src/assets'),
          name: 'assets/[path][name].[ext]?[hash:7]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash:7]',
        },
      },
      {
        test: /\.(mp3)$/,
        loader: 'file-loader',
        options: {
          context: resolve(__dirname, '../src'),
          name: '[path][name].[ext]?[hash:7]',
        },
      },
    ],
  },
  plugins: [
    new ManifestPlugin({
      basePath: publicPath,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  externals: {
    wx: 'wx',
    zepto: 'Zepto',
  },
};

