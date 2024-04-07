const path = require('path');
const glob = require('glob');
const {exec} = require('child_process');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const basePath = path.resolve('src', 'apps');

// basePath配下の各ディレクトリを複数のentryとする
const entries = glob.sync('**/index.+(js|ts|tsx)', {cwd: basePath}).reduce(
  (prev, file) => ({
    ...prev,
    [path.dirname(file)]: path.resolve(basePath, file),
  }),
  {}
);

module.exports = (env, argv) => ({
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
    {
      // watchモードのとき再ビルドされたものをアップロードする
    apply: (compiler) => {
      compiler.hooks.afterEmit.tapAsync(
        'UploadJavascriptFilesPlugin',
        (compilation, callback) => {
          if (!env.upload) {
            callback();
            return;
          }

          const emittedFiles = [...compilation.emittedAssets]
            .map((file) => file.replace('.js', ''));

          if (emittedFiles.length === 0) {
            callback();
            return;
          }

          const processes = emittedFiles.map((file) => {
            return new Promise((resolve, reject) => {
              const manifestPath = glob.sync(`@(${file})/customize-manifest.json`, {
                cwd: basePath,
              }).map(file => path.resolve(basePath, file));

              if (manifestPath.length === 0) {
                resolve();
                return;
              }

              console.log('\nuploading... ', manifestPath[0]);
              exec(`yarn upload ${manifestPath[0]}`, (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
                if (err) reject(err);
                else resolve();
              });
            });
          });

          Promise.all(processes).then(() => callback()).catch(callback);
        }
      );
    },
    },
  ],
});
