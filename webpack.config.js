const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var SRC = path.resolve(__dirname, 'src/main.js');

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === "production";
  const publicPath = '';

  const pcss = {
    test: /\.(p|post|)css$/,
    use: [
      isProductionBuild ? MiniCssExtractPlugin.loader : "vue-style-loader",
      "css-loader",
      "postcss-loader",
    ],
  };

  const vue = {
    test: /\.vue$/,
    loader: "vue-loader",
  };

  const js = {
    test: /\.js$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    options: {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-syntax-dynamic-import"],
    },
  };

  const files = {
    test: /\.(png|jpe?g|gif|mp3|woff2?)$/i,
    loader: "file-loader",
    // options: {
    //   name: "[hash].[ext]",
    // },
  };


  const svg = {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
        },
      },
      "svg-transform-loader",
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { removeTitle: true },
            {
              removeAttrs: {
                attrs: "(fill|stroke)",
              },
            },
          ],
        },
      },
    ],
  };

  const pug = {
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ["pug-plain-loader"],
      },
      {
        use: ["pug-loader"],
      },
    ],
  };

  const mp3 = {
    test: /\.mp3$/,
    include: SRC,
    loader: 'file-loader',

  }

  const config = {
    entry: {
      main: "./src/main.js",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[hash].build.js",
      publicPath: isProductionBuild ? publicPath : "",
      chunkFilename: "[chunkhash].js",
    },
    module: {
      rules: [pcss, vue, js, files, svg, pug, mp3],
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        jquery: "jquery/src/jquery",
        images: path.resolve(__dirname, "./src/images"),
        styles: path.resolve(__dirname, "./src/styles"),
      },
      extensions: ["*", ".js", ".vue", ".json"],
    },
    devServer: {
      historyApiFallback: true,
      noInfo: false,
      overlay: true,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),

      new HtmlWebpackPlugin({
        template: "src/index.pug",
        filename: "index.html",
        chunks: ["main"],
      }),

      new SpriteLoaderPlugin({ plainSprite: true }),
      new VueLoaderPlugin(),
    ],
    devtool: "#eval-source-map",
  };

  if (isProductionBuild) {
    config.devtool = "none";
    config.plugins = (config.plugins || []).concat([
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"',
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[contenthash].css",
      }),
    ]);

    config.optimization = {};

    config.optimization.minimizer = [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ];
  }

  return config;
};