/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
    'index.min': './src/index.ts'
  },
  output: {
    library: {
      name: 'taiwanIdValidator',
      type: 'umd'
    },
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
