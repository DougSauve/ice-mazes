"use strict"

const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, '/src/App.js')],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-env',
              'babel-preset-react'
            ],
            plugins: [
              ['transform-class-properties', { 'spec': true}],
              ['transform-object-rest-spread']
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.png$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              // disable: true
            }
          }
        ]
      }
    ]
  },
  
};