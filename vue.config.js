const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const IS_PRO = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    host: "0.0.0.0",
    port: 7777,
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true, // important extra layer for less-loader^6.0.0
        },
      },
    },
  },

  configureWebpack: (config) => {
    const plugins = [];

    config.optimization = {
      splitChunks: {
        chunks: "all",
        minSize: 3000, // （默认值：30000）块的最小大小。
        minChunks: 1, //（默认值：1）在拆分之前共享模块的最小块数
        maxAsyncRequests: 5, //（默认值为5）按需加载时并行请求的最大数量
        maxInitialRequests: 6, // （默认值为3）入口点的最大并行请求数
        automaticNameDelimiter: "-",
        name: true,
        cacheGroups: {
          lodash: {
            name: "lodash",
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            priority: 20,
          },
          vue: {
            name: "vue",
            test: /[\\/]node_modules[\\/]vue[\\/]/,
          },
          vuex: {
            name: "vuex",
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
          },
          "vue-router": {
            name: "vue-router",
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
          },
          "ant-design-vue": {
            name: "ant-design-vue",
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
          },
        },
      },
    };

    if (IS_PRO) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    config.plugins = [...config.plugins, ...plugins];
  },

  chainWebpack: (config) => {
    config.resolve.symlinks(true);

    if (process.env.use_analyzer) {
      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
    }

    if (IS_PRO) {
      config.store.set("devtool", "");
      config.plugin("html").tap(([options]) => [
        Object.assign(options, {
          minify: {
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            conservativeCollapse: false,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeAttributeQuotes: false,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            minifyJS: true,
            minifyCSS: true,
          },
          cache: true, // 仅在文件被更改时发出文件
          hash: true, // true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中,这对于清除缓存很有用
          scriptLoading: "defer", // 现代浏览器支持非阻塞javascript加载（'defer'）,以提高页面启动性能。
          inject: true, // true所有javascript资源都将放置在body元素的底部
          chunksSortMode: "none",
        }),
      ]);
    } else {
      config.store.set("devtool", "eval-source-map");
      config.plugin("html").tap(([options]) => [
        Object.assign(options, {
          minify: false,
          chunksSortMode: "none",
        }),
      ]);
    }
  },
};
