/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  target: ['web', 'es5'],
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
    sourceMapFilename: '[name].map',
    globalObject: 'this'
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
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          "/src/**/*.test.ts"
        ],
        options: {
          configFile: "tsconfig.webpack.json"
        }
      }
    ]
  }
}
