const path = require('path');
const glob = require('glob');
const {exec} = require('child_process');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const basePath = path.resolve('src', 'apps');

// basePath配下の各ディレクトリを複数のentryとする
const entries = glob.sync('**/index.+(js|ts)', {cwd: basePath}).reduce(
  (prev, file) => ({
    ...prev,
    [path.dirname(file)]: path.resolve(basePath, file),
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
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    {
      // watchモードのとき再ビルドされたものをアップロードする
      apply: (compiler) => {
        compiler.hooks.afterEmit.tapPromise(
          'upload javascript files',
          (compilation) => {
            if (!compiler.options.watch) return Promise.resolve();

            const emittedFiles = Object.keys(compilation.assets)
              .filter((file) => {
                const source = compilation.assets[file];
                return source.emitted && source.existsAt;
              })
              .map((file) => file.replace('.js', ''));

            const processes = glob
              .sync(`@(${emittedFiles.join('|')})/customize-manifest.json`, {
                cwd: basePath,
              })
              .map((file) => {
                console.log('\nuploading... ', file);
                return exec(
                  `yarn upload ${path.resolve(basePath, file)}`,
                  (err, stdout, stderr) => {
                    if (stdout) process.stdout.write(stdout);
                    if (stderr) process.stderr.write(stderr);
                  }
                );
              });
            return Promise.all(processes);
          }
        );
      },
    },
  ],
};
