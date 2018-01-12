const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

config = {
  // location of webpack entry js file
  entry: "./src/index.1.js",
  output: {
    // name of output file
    filename: "bundle.js",
    // directory for output file
    path: path.resolve(__dirname, "./public"),

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: [ /node_modules/, "index.js"],
        include: path.join(__dirname, "src"),
        loader: "babel-loader"
      },
      // STYLES
      {
        // apply loaders to .scss and .css files
        test: /\.(s*)css$/,
        include: path.join(__dirname, "src"),
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true, // fallback to /index.html for SPA
    inline: true, // set to false to disable client scripts
    hot: true,
    port: 8080
  },
  devtool: "eval-source-map" // enable devtool for better debugging experience
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    // if environment is production, call uglify plugin and 
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    }) 
  );
}