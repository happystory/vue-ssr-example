const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  // new webpack.NamedModulesPlugin(),
  // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // 这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ],

  devServer: {
    hot: true,
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      warnings: false,
      errors: true
    }
  }
})
