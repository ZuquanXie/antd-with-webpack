const path = require('path');
const isDevMode = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

/* 自定义服务 */
const customServer = require('./src/server/index.js');

/* less全局变量 */
const lessModifyVars = require('./src/theme/lessModifyVars');

/* 插件 */
const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/templates/index.html'),
    favicon: path.resolve(__dirname, 'src/public/favicon.ico')
  })
];

/* 代码分块 */
const optimization = {
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    name: true,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
};

/* 开发模式 */
if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

/* 发布模式 */
if (process.env.NODE_ENV === 'production') {
  plugins.push(new CleanWebpackPlugin([path.resolve(__dirname, 'build')]));
  plugins.push(new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }));

  optimization.minimizer = [
    new UglifyJsWebpackPlugin({
      sourceMap: true
    })
  ];
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: isDevMode ? '[name].js' : '[chunkHash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  devtool: isDevMode ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'src/public'),
    before: customServer,
    hot: true,
    /* 访问内容的重写（当http请求的地址匹配不到内容时，根据重写规则重写返回内容，可用于解决前端路由页面刷新时路由不匹配的问题） */
    historyApiFallback: true // 简单配置
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /\*/, to: '/' }
    //   ]
    // }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
            ]
          }
        }]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          'css-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true, modifyVars: lessModifyVars } }
        ]
      },
      {
        test: /\.(jpg|png|svg|gif|ico|mp4)$/,
        use: [
          { loader: 'file-loader', options: { outputPath: 'static' } }
        ]
      }
    ]
  },
  plugins,
  optimization
};
