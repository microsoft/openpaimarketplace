// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  dotenv.config();

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './index.jsx',
      plugin: './plugin.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash', '@babel/plugin-syntax-dynamic-import'],
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            '@svgr/webpack',
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/assets/font/',
                outputPath: 'assets/font/',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.js', 'json'],
      alias: {
        App: path.resolve(__dirname, 'src/app'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ['index'],
        template: './index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          MARKETPLACE_API_URL: JSON.stringify(process.env.MARKETPLACE_API_URL),
          NPM_INSTALL_TOKEN: JSON.stringify(process.env.NPM_INSTALL_TOKEN),
          REST_SERVER_URI: JSON.stringify(process.env.REST_SERVER_URI),
        },
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^esprima$/,
        contextRegExp: /js-yaml/,
      }),
      new webpack.ProvidePlugin({
        cookies: 'js-cookie',
        'window.cookies': 'js-cookie',
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: process.env.SERVER_PORT,
      contentBase: false,
      disableHostCheck: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  };
};
