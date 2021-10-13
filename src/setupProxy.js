const { createProxyMiddleware } = require("../node_modules/http-proxy-middleware/dist/index");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/authorization/signup", {
      target: "http://bootcampapi.techcs.io/api/fe/v1",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/authorization/signin", {
      target: "http://bootcampapi.techcs.io/api/fe/v1",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/detail/category/all", {
      target: "http://bootcampapi.techcs.io/api/fe/v1",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/product/all", {
      target: "http://bootcampapi.techcs.io/api/fe/v1",
      changeOrigin: true,
    })
  );
};
