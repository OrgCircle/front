const PORT = process.env.PORT || 8081;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://localhost:" + PORT + "/api",
  }
}