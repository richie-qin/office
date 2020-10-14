module.exports = {
  publicPath:"/",
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    host: "localhost", //localhost  192.168.0.101
    port: 8080, // 端口
    open: true, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      //配置跨域
      '/api': {
        target: "http://47.94.5.59:9001",
        // ws:true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
    }
  },
  configureWebpack:{
    externals: {
        "BMap": "BMap"
    }
  }
}