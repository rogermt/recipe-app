var webpack = require( 'webpack' );
var bundleName = 'app.js';
var path = require( 'path' );

module.exports = {
  entry: './front/app.js',

  output: {
    filename: bundleName,
    path: path.join( __dirname, 'public' ),
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015' ],
        },
      },
    ],
  },
};
