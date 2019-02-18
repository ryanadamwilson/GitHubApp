const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = {
  client: "./client.js",
  // server: "./server.js",
};

module.exports = {
  devtool: 'inline-source-map',
  entry,
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
  },
  mode: 'development',
  module: {
    rules: [
      {
        // Use Babel for transpiling JSX and ES2015 syntax to ES5
        test: /\.jsx?$/, // catches .js, .jsx
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9000,
    open: 'Chrome',
    index: 'index.html',
  },
  resolve: {
    modules: ["/", "node_modules", "bower_components"],
    extensions: [".js", ".jsx"],
  },
  target: "node",
};
