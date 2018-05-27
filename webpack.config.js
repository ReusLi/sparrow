const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: [
            { loader: "css-loader" }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: [
            { loader: "less-loader" }
          ]
        })
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        default: false,
        vendor: { 
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10, 
          enforce: true
        }
      }
      
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin({
      filename: "[name].[hash].css"
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};