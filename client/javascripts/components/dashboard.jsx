const React = require('react')
const { connect } = require('react-redux')
const { fetchProductData } = require('../actions/dashboard')

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValueInFilterField: "",
      valueToFilterOn: "N/A"
    }
  }

  componentWillMount() {
    this.props.fetchProductData()
  }

  updateValueInFilterField(event) {
    this.setState({ inputValueInFilterField: event.target.value })
  }

  setFilterValue(event) {
    this.setState({ valueToFilterOn: this.state.inputValueInFilterField })
    event.preventDefault()
  }

  filterProducts(filterVal) {
    let filteredProducts = this.props.products.filter((productObj) => {
        return productObj.defaultPriceInCents/100 <= filterVal
    })

    return filteredProducts
  }

  removeFilter() {
    this.setState({ valueToFilterOn: "N/A" })
  }

  renderProductList() {
    let filterVal = this.state.valueToFilterOn
    let productList = filterVal !== "N/A" ? this.filterProducts(filterVal) : this.props.products

    let renderedProducts = productList.map((productObj, i) => {
      return (
        <div key={ i }>
          <div>{ productObj.name + ", $" + productObj.defaultPriceInCents/100 }</div>
          <img src={ 'http:' + productObj.mainImage.ref } />
        </div>
      )
    })

    return renderedProducts
  }

  render() {

    return (
      <div>
        <div>
          <form onSubmit={ (e) => this.setFilterValue(e) }>
            <label>
              Filter by Amount:
              <input
                type="text"
                placeholder="e.g. 10"
                value={ this.state.inputValueInFilterField }
                onChange={ (e) => this.updateValueInFilterField(e) }
              />
            </label>
            <input type="submit" value="Filter" />
          </form>

          <button
            onClick={ () => { this.removeFilter() } }>
            Show All Products
          </button>
        </div>

        <div>
          { this.renderProductList() }
        </div>

      </div>
    )
  }
}

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
