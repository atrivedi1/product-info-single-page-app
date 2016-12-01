const React = require('react')
const { connect } = require('react-redux')
const { fetchProductData } = require('../actions/dashboard')

const Dashboard = React.createClass({
  componentWillMount() {
    this.props.fetchProductData()
  },

  render() {

    let productImages = this.props.products.map((productObj, i) => {
      return (
        <div key={ i }>
          <div>{ productObj.name + ", $" + productObj.defaultPriceInCents/100 }</div>
          <img src={ 'http:' + productObj.mainImage.ref } />
        </div>
      )
    })

    return (
      <div>

        <div>
          { productImages }
        </div>

      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    pageTitle: state.dashboard.get('pageTitle'),
    extraInfo: state.dashboard.get('extraInfo'),
    displayName: state.dashboard.get('displayName'),
    bannerImage: state.dashboard.get('bannerImage'),
    products: state.dashboard.get('productList')
  }
}

function mapDispatchToActions(dispatch) {
  return {
    fetchProductData: (...args) => fetchProductData(dispatch, ...args)
  }
}

module.exports = connect(mapStateToProps, mapDispatchToActions)(Dashboard)
