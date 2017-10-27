const webpack = require('webpack');
const { smart } = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const baseConfig = require('./webpack.base.config');

module.exports = smart(baseConfig, {
  entry: {
    index: [
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
        use:
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          }),
      },
      {
        test: /^((?!\.global).)*\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: 'cheap-module-source-map',
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new ImageminPlugin(),
  ],
});

