const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "source-map",
  devServer: {
    contentBase: "./public",
    open: true,
    host: "0.0.0.0",
    useLocalIp: true,
  },
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "../public"), // Changed from "../dist" to "../public"
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "static" }]),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: { esModule: false },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "audio/" },
          },
        ],
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "fonts/" },
          },
        ],
      },
    ],
  },
};
