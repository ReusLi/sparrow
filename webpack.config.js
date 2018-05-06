const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "less-loader" }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};