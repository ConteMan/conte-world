const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

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