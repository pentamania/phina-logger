const webpack = require("webpack");
const path = require('path');
const pkg = require('./package.json');

const banner = `
${pkg.name} ${pkg.version}
${pkg.license} Licensed
Copyright (C) ${pkg.author}
`;

const srcPath = path.resolve(__dirname, 'src/entry.js');
const distPath = path.resolve(__dirname, 'dist');
const isProduction = (process.env.NODE_ENV != null && process.env.NODE_ENV.trim() === "production");
const buildMode = (isProduction) ? 'production' : 'development';
const filename = (isProduction) ? `${pkg.name}.min.js` : `${pkg.name}.js`;

module.exports = {
  mode: buildMode,
  entry: srcPath,
  output: {
    path: distPath,
    filename: filename,
    /* webpack v4のエラー？: UMDのときはglobalをthisにしないとwebではwindowを指してくれなくなる
      https://github.com/webpack/webpack/issues/6522
    */
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
    })
  ],
  // devtool: (isProduction) ? "source-map" : 'eval-source-map',
  devtool: "source-map",
  externals: {
    // esm/node/webそれぞれでの取り扱い方を変える
    'phina.js': {
      commonjs: 'phina.js',
      commonjs2: 'phina.js',
      amd: 'phina.js',
      root: 'phina', // window(global)でのプロパティ名
    },
  },
};