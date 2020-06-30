module.exports = {
  entry: './app.ts',
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  devServer: {},
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
}