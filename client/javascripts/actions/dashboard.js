const baseUrl = 'http://localhost:3000'

function fetchProductData(dispatch) {

  $.ajax({
      type: 'GET',
      url: baseUrl + '/products',
      success: function(productInfo) {
        console.log("product request complete")
        dispatch(retrievedProductData(productInfo))
      }
  })
}

function retrievedProductData(productInfo) {
  let productData = {
    productInfo: productInfo,
  }

  return {
    type: "PRODUCT_DATA_RETRIEVED",
    productData
  }
}

module.exports = {
  fetchProductData
}

