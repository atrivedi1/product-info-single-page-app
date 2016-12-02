const Immutable = require('immutable')

const initialDashboardState = Immutable.fromJS({
  pageTitle: null,
  extraInfo: null,
  displayName: null,
  bannerImage: null,
  productList: [],
})

function DashboardReducer(state, action) {
  state = state ? state : initialDashboardState

  if (!(action instanceof Immutable.Map)) {
    action = Immutable.fromJS(action)
  }

  switch (action.get('type')) {
    case "PRODUCT_DATA_RETRIEVED": {

      //product information
      let pageTitle = action.getIn(['productData', 'productInfo', 'pageTitle'])
      let extraInfo = action.getIn(['productData', 'productInfo', 'extraInfo'])
      let displayName = action.getIn(['productData', 'productInfo', 'displayName'])
      let bannerImage = action.getIn(['productData', 'productInfo', 'bannerImage']).toJS()
      let products = action.getIn(['productData', 'productInfo', 'products']).toJS()
      //console.log("products --->", products)


      //update state
      return state
        .set('pageTitle', pageTitle)
        .set('extraInfo', extraInfo)
        .set('displayName', displayName)
        .set('bannerImage', bannerImage)
        .set('productList', products)
    }

    default: {
      return state
    }
  }
}

module.exports = DashboardReducer
