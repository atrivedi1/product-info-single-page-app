'use strict'
//NOTE: If I had more time I would refactor to make this more DRY
const requestPromise = require('request-promise')
const baseProductUrl = 'http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js'

const requestOptions = {
  url: baseProductUrl,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: { id: null, responseType: 'JSON' },
  json: true
}

module.exports = {
  getProductInfo: function(req, res, cb) {

    requestPromise(requestOptions)
      .then((productInfo) => {
        console.log(product)

        res.status(200).json(cleanedUpVehicleInfo)
        cb()
      })
      .catch((err) => res.status(500).send("Uh oh! We're having data issues"))
  }
}
