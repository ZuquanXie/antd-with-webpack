const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    vendor: ['react', 'react-dom', 'antd']
  },
  output: {
    filename: "[name].[hash].js", // best use [hash] here too
    path: path.resolve(__dirname, "dll"),
    library: "[name].[hash].lib"
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dll/')]),
    new webpack.DllPlugin({
      name: "[name].[hash]",
      path: path.resolve(__dirname, "dll/manifest.json")
    })
  ]
};
