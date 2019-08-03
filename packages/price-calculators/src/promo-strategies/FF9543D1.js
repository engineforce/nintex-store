// Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased

const assert = require('assert')
const errcode = require('err-code')
const { pipe, filter, reduce } = require('ramda')

const THRESHOLD = 10
const ERR_DOCGEN_COUNT = 'ERR_DOCGEN_COUNT'

module.exports = ({ orderItems, products }) => {
  assert(
    getDocumentsCount(orderItems) >= THRESHOLD,
    errcode(
      new Error(`Number of documents are less than ${THRESHOLD}`),
      ERR_DOCGEN_COUNT
    )
  )

  return calculateTotalFromOrderItems(products)(orderItems)
}

/**
 * @type { (orderItems: any[]) => number }
 */
const getDocumentsCount = pipe(
  filter(orderItem => orderItem.productId == 'docgen'),
  reduce((count, item) => count + item.quantity, 0)
)

const calculateTotalFromOrderItems = products =>
  reduce((total, item) => {
    if (item.productId === 'docgen') {
      return total + item.quantity * 8.99
    }

    return total + item.quantity * products[item.productId].price
  }, 0)
