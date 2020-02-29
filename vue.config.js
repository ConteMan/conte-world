const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        host: '0.0.0.0',
        port: 7777
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.plugin("html").tap(args => {
            args[0].ga = process.env.VUE_APP_BASE_GA;
            return args;
        });
    },
    configureWebpack: config => {
        const plugins = []
        plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                threshold: 10240,
                minRatio: 0.8
            })
        )
        config.plugins = [...config.plugins, ...plugins]
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'layout-header-background': '#FFFFFF',
                    'layout-body-background': '#FFFFFF',
                },
                javascriptEnabled: true
            }
        }
    }
}