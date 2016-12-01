const controller = require('../controllers')

function router(app) {
  //dashboard related routes
  app.get("/products", controller.dashboard.getProductInfo)
}

module.exports = router
