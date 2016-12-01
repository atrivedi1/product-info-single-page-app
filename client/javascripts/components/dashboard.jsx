const React = require('react')
const { connect } = require('react-redux')
const { fetchProductData } = require('../actions/dashboard')

const Dashboard = React.createClass({
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
        <div className="fetch_products_button_container">
          <button
            className="button_fetch_products"
            onClick={ () => {
              this.props.fetchProductData() } }>
             Reset Product Page
          </button>
        </div >

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
