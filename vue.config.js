const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8001,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/admin/, to: '/admin.html' }
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
            filename: 'index.html'
        },
        antd:{
            entry: 'src/views/antd/main.js',
            template: 'public/antd/index.html',
            filename: 'admin.html'
        }
    }
}