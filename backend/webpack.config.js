const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);
  
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});


  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index_bundle.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
          // include: [
          //   path.resolve(
          //     __dirname,
          //     "node_modules/bootstrap/dist/css",
          //     "node_modules/react-bootstrap-typeahead/css"
          //   )
          // ]
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {}
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/favicon.ico"
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  }
};
