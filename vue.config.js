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
        host: '192.168.1.89',
        port: 8001,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/default.html' } //注意 history 模式和 hash 模式
            ]
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@antdcomponents', resolve('src/components/antd'))
    },
    pages: {
        // default:{
        //     entry: 'src/views/default/main.js',
        //     template: 'public/default/index.html',
        //     filename: 'default.html'
        // },
        // antd:{
        //     entry: 'src/views/antd/main.js',
        //     template: 'public/antd/index.html',
        //     filename: 'admin.html'
        // },
        // botalk:{
        //     entry: 'src/views/botalk/main.js',
        //     template: 'public/botalk/index.html',
        //     filename: 'botalk.html'
        // },
        nav:{
            entry: 'src/views/nav/main.js',
            template: 'public/nav/index.html',
            filename: 'nav.html'
        }
    }
}