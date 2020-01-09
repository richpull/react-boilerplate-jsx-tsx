import '@babel/polyfill';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

module.exports = {
  devtool: false,
  entry: {
    main: ['@babel/polyfill', './src/app/index.tsx', './src/styles/scss/main.scss'],
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[hash].js`,
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
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: false, url: false }, // url: false - relative urls
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: false, config: { path: `./postcss.config.js` } },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    alias: {},
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'assets/img' },
      { from: 'src/styles/font/', to: `${PATHS.assets}/font` },
    ]),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
      chunkFilename: '[id].[hash].styles',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: true,
          },
        },
      }),
      new ImageMinPlugin({
        test: /\.(png|jpe?g|gif|svg)$/,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { sourceMap: false },
      }),
    ],
  },
};
