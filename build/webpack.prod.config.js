const webpack = require('webpack');
const { smart } = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        test: /\.css$/,
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
        test: /\.(jpg|png|gif|ico|svg)/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
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
  ],
});

