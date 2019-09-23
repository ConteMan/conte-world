const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: true,
    devServer: {
        port: 8001
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    }
    // pages: {
    //     index:{
    //         entry: '',
    //     },
    //     antd:{
    //
    //     }
    // }
}