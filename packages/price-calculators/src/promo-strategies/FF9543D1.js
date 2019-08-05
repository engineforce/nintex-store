// Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased

const { pipe, filter, reduce } = require('ramda')

const THRESHOLD = 10

module.exports = ({ orderItems, products, total }) => {
  if (getDocumentsCount(orderItems) >= THRESHOLD) {
    return calculateTotalFromOrderItems(products)(orderItems)
  }

  return total
}

/**
 * @type { (orderItems: any[]) => number }
 */
const getDocumentsCount = pipe(
  filter(orderItem => orderItem.productId === 'docgen'),
  reduce((count, item) => count + item.quantity, 0)
)

const calculateTotalFromOrderItems = products =>
  reduce((total, item) => {
    if (item.productId === 'docgen') {
      return total + item.quantity * 8.99
    }

    return total + item.quantity * products[item.productId].price
  }, 0)
