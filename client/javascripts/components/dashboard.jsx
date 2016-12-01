const React = require('react')
const { connect } = require('react-redux')

const { fetchProductData } = require('../actions/dashboard')

const Dashboard = React.createClass({
  render() {
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

      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    //placeholder
    // productInfo: state.productInfo.get('productPictures'),
  }
}

function mapDispatchToActions(dispatch) {
  return {
    fetchProductData: (...args) => fetchCarData(dispatch, ...args)
  }
}

module.exports = connect(mapStateToProps, mapDispatchToActions)(Dashboard)
