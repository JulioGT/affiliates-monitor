const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
       'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader?url=false',
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")()
              ],
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  }
};