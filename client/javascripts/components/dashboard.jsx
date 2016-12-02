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
    this.setState({ inputValueInFilterField: "" })
    this.setState({ valueToFilterOn: "N/A" })
  }

  renderProductList() {
    let filterVal = this.state.valueToFilterOn
    let productList = filterVal !== "N/A" ? this.filterProducts(filterVal) : this.props.products

    let renderedProducts = productList.map((productObj, i) => {

      return (

        <div className="product_information_container" key={ i }>

          <div className="product_information_card">

            <div className="product_description">
              { productObj.name + ":  $" + productObj.defaultPriceInCents/100 }
            </div>

            <div className="product_image_container">
              <img className="product_image" src={ 'http:' + productObj.mainImage.ref } />
            </div>
          </div>
        </div>
      )
    })

    return renderedProducts
  }

  render() {

    return (
      <div>

        <div className="action_container">

          <form onSubmit={ (e) => this.setFilterValue(e) }>
            <label className="input_field_label">
              Filter by Amount:
              <input
                className="input_field"
                type="text"
                placeholder="e.g. 10"
                value={ this.state.inputValueInFilterField }
                onChange={ (e) => this.updateValueInFilterField(e) }
              />
            </label>
            <input className="filter_button" type="submit" value="Filter" />
          </form>

          <button
            className="show_all_button"
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
