const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Этот плагин извлекает CSS в отдельные файлы.
//Он создает CSS-файл для каждого JS-файла, который содержит CSS.
//Он поддерживает загрузку CSS и исходных карт по запросу.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Минифицирует сss
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
//Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
const CopyPlugin = require('copy-webpack-plugin');
const folders = ['fonts', 'images'];

const copyFolders = folders =>
  folders.map(folder => {
    return {
      from: path.resolve(__dirname, './src/' + folder),
      to: './' + folder,
      noErrorOnMissing: true,
    };
  });

module.exports = env => {
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    entry: {
      app: path.resolve(__dirname, 'src', 'app.js'),
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      path: path.resolve(__dirname, './build'),
      clean: true, //чистит файлы, при добавлении в билд
      sourceMapFilename: '[name].js.map',
    },
    devServer: {
      client: {
        overlay: true,
      },
      static: {
        directory: path.resolve(__dirname, './build'),
      },
      port: env.port ?? 9000,
      watchFiles: [
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.html',
        'src/**/*.ejs',
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `!!ejs-compiled-loader!${path.resolve(
          __dirname,
          'src',
          'pages',
          'index.ejs',
        )}`,
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      }),
      new CopyPlugin({
        patterns: [...copyFolders(folders)],
      }),
      new StylelintPlugin(),
      new ESLintPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.ejs$/,
          use: ['ejs-compiled-loader'],
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    'postcss-mixins',
                    'postcss-custom-media',
                    'postcss-nested',
                    autoprefixer({
                      browsers: ['last 2 versions'],
                    }),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/img/[name][ext]',
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    devtool: isDev ? 'inline-source-map' : false,
  };
};
