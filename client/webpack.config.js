const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });

//const envPrefix = dotenv.parsed.ENVPREFIX || '';
let envVars = Object.entries(dotenv.parsed).reduce((obj, [key, value]) => {
  // let match = new RegExp('^' + envPrefix, 'i');
  // if (match.test(key)) {
    obj[key] = JSON.stringify(value);
  // }
    return obj;
}, {})

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");

const options = {
  devTool: "source-map",
  uglify: {}
};

// if (process.env.NODE_ENV === 'production') {
//   options.devTool = '';
//   module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress: { warnings: false }
//   }))
// }

module.exports = {
  entry: ["babel-polyfill", "./src/index.jsx"],
  output: {
    filename: "./public/bundle.js"
  },
  watch: true,
  devtool: options.devTool,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.(css)$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: 65
              },
              svggo: {},
              webp: {
                quality: 65
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envVars,
    })
  ]
  // plugins: [
  //   new ExtractTextPlugin('./client/styles/main.css', {
  //     allChunks: true
  //   }),
  // new OptimizeCssAssetsPlugin({
  //   assetNameRegExp: /\.optimize\.css$/g,
  //   cssProcessor: require('cssnano'),
  //   cssProcessorOptions: { discardComments: { removeAll: true } },
  //   canPrint: true
  // }),
  // ]
};
