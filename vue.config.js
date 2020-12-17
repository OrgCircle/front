const URL = process.env.URL || "http://localhost:8081/api";

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: URL,
  }
}