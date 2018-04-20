const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  // new UglifyJsPlugin(/* ... */),
  // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
  // new webpack.optimize.ModuleConcatenationPlugin(),
  // new webpack.NoEmitOnErrorsPlugin()
  mode: 'production',

  devtool: false,

  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[id].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  },

  module: {
    rules: [{
      test: /\.styl$/,
      use: [
        // extract-text-webpack-plugin不支持webpack4
        // 参见：https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/749
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 处理路径问题
            publicPath: '../../'
          }
        },
        'css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },

  optimization: {
    minimizer: [
      // 优化js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      // 优化css
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: { // 这里开始设置缓存的 chunks
        commons: {
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 最小尺寸，默认0,
          minChunks: 2, // 最小 chunk ，默认1
          maxInitialRequests: 5 // 最大初始化请求书，默认1
        },
        vendor: {
          test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
          chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          priority: 10, // 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // 打包前先清空 dist 目录
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    // 提取 css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[id].[chunkhash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        // 移除注释
        removeComments: true,
        // 移除空白
        collapseWhitespace: true
      }
    })
  ]
})
