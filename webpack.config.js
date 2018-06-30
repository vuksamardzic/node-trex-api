const path = require('path');
const node_externals = require('webpack-node-externals');
const nodemon_plugin = require('nodemon-webpack-plugin');

const server_config = {
  entry: './src/server.js',
  target: 'node',
  externals: [node_externals()],
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new nodemon_plugin()
  ]
};

module.exports = [server_config];
