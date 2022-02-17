/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const common = {
  mode: 'production',
  devtool: 'source-map',
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
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}

const es5Config = {
  ...common,
  target: ['web', 'es5'],
  entry: {
    'es5/index': './src/index.ts',
    'es5/index.min': './src/index.ts'
  },
  module: {
    rules: [
      {
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.es5.json'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}

const defaultConfig = {
  ...common,
  target: ['web', 'es6'],
  entry: {
    index: './src/index.ts',
    'index.min': './src/index.ts'
  }
}

module.exports = [es5Config, defaultConfig]
