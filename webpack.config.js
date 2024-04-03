const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.mode || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'eval' : undefined;

module.exports = (env) => {
  return {
    mode,
    devtool,
    devServer: {
      port: 5000,
      open: true,
      hot: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
      assetModuleFilename: 'assets/[hash][ext]',
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'public' }],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        inject: 'head',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),
      new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')]
                },
              }
            },
            'sass-loader'
          ],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  }
}
