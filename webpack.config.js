const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: "./src/js/select.js",
  mode: 'development',
  output: {
    filename: "app.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "",
  },
//   devServer: {
//     open: true,
//     host: "localhost",
//     port: 9000,
//   },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};
