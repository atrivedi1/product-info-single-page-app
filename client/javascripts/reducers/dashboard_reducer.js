const Immutable = require('immutable')

const initialDashboardState = Immutable.fromJS({
  productInfo: [],
})

function DashboardReducer(state, action) {
  state = state ? state : initialDashboardState

  if (!(action instanceof Immutable.Map)) {
    action = Immutable.fromJS(action)
  }

  switch (action.get('type')) {
    case "PRODUCT_DATA_RETRIEVED": {
      //product information
        console.log("action:", action)

      //update state

      /*return state
        .setIn(['carInformation','vehicleInfo'], vehicleInfo)
        .setIn(['carInformation','securityInfo'], securityInfo)
        .setIn(['carInformation','fuelRange'], fuelRange)
        .setIn(['carInformation','batteryRange'], batteryRange)
        .set('displayEngineInfo', true)*/
    }

    default: {
      return state
    }
  }
}

module.exports = DashboardReducer
