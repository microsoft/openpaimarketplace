// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
        {
          test: /\.ya?ml$/,
          type: 'json', // Required by Webpack v4
          use: 'yaml-loader'
        }
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
        'process.env.MARKETPLACE_API_URL': JSON.stringify(
          process.env.MARKETPLACE_API_URL,
        ),
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
      port: 9292,
      contentBase: false,
      disableHostCheck: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  };
};
