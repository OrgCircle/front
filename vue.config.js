const API_URL = process.env.API_URL;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: API_URL,
  }
}