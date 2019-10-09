const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    productionSourceMap: false,
    runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
    devServer: {
        host: '192.168.1.89',
        port: 8001,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/default.html' }
            ]
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@antdcomponents', resolve('src/components/antd'))
    },
    pages: {
        default:{
            entry: 'src/views/default/main.js',
            template: 'public/default/index.html',
            filename: 'default.html'
        },
        antd:{
            entry: 'src/views/antd/main.js',
            template: 'public/antd/index.html',
            filename: 'admin.html'
        },
        botalk:{
            entry: 'src/views/botalk/main.js',
            template: 'public/botalk/index.html',
            filename: 'botalk.html'
        }
    }
}