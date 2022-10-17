module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "^/nsclc": {
        target: "http://localhost:8001", // 后台接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "/nsclc": "",
        },
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
