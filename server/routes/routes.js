const controller = require('../controllers')

function router(app) {
  //dashboard related routes
  app.get("/vehicles/:carId", controller.dashboard.getVehicleInfo)
}

module.exports = router
