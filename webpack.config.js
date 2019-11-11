const path = require("path");
const glob = require("glob");

const basePath = "./src";

// basePath配下の各ディレクトリを複数のentryとする
const entries = glob.sync("**/index.js", { cwd: basePath }).reduce(
  (prev, file) => ({
    ...prev,
    [path.dirname(file)]: path.resolve(basePath, file)
  }),
  {}
);

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  externals: {
    jquery: "jQuery"
  }
};
