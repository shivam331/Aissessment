const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'main.js',
  //   publicPath: '/'
  // },
  mode : 'development',
  devServer: {
    historyApiFallback: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
       test: /\.(png|jpg|gif)$/i,
       use: [
         {
           loader: 'url-loader',
           options: {
             limit: 8192
           }
         }
       ]
     },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
  test: /\.css$/,
  loader: 'style-loader'
},
{
  test: /\.css$/,
  loader: 'css-loader',
  query: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
}
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
