/*
 * @author lanxuewu
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const evn = process.env.NODE_ENV;

const config = {
  entry: {
    'index':'./src/app/index',
    'lib':["vue","vue-router","vuex","lodash"]
  },
  output: {
    path: './dist',
    filename: 'js/[name].js?v=[chunkhash]',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'/src/index.html'),
      filename: path.join(__dirname,'/dist/index.html'),
      excludeChunks: [],
      inject: true
    }),

    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),

    new ExtractTextPlugin("css/[name].css?v=[chunkhash]",{allChunks: false}),

    new webpack.optimize.CommonsChunkPlugin({
        name: "lib",
        minChunks: Infinity,
        filename: "js/lib.js?v=[chunkhash]",
        warning: false
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(js|es6)$/,
        loader: 'babel',
        exclude: /node_module/
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css")
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: "url-loader",
          query: {
              limit: 1024,
              name: "/img/[name].[ext]?[hash:8]"
          }
      },
      {
          test: /\.glsl$/,
          loader: "shader"
      },
      {
          test: /\.json$/,
          loader: "json-loader",
           query: {
              name: "/data/[name].[ext]?[hash:8]"
          }
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel',
      css:ExtractTextPlugin.extract("style-loader", "css")
    }
  },
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    extensions: ['','.js','.vue'],
    alias:{
      '_vuex':path.resolve(__dirname, "./src/vuex")
    }
  }
}

//开启压缩
if(evn=="publish"){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            compress: {
                drop_debugger: true,
                warnings: false,
                drop_console: true
            },
            comments:false
        })
    );
}
module.exports = config;
