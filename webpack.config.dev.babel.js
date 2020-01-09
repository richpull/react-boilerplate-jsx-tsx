import '@babel/polyfill';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

module.exports = {
  devtool: false,
  entry: {
    main: ['@babel/polyfill', './src/app/index.tsx', './src/styles/scss/main.scss'],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    https: false,
    port: 8081,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              cacheDirectory: true,
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
      { from: 'src/styles/font/', to: 'font' },
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['bundle.js'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
  ],
};
