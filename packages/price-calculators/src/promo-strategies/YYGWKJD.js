// Reduces the form price to $89.99 a unit when at least 1 wf is purchased

const { pipe, filter, reduce } = require('ramda')

const THRESHOLD = 1

module.exports = ({ orderItems, products, total }) => {
  if (getWorkflowsCount(orderItems) >= THRESHOLD) {
    return calculateTotalFromOrderItems(products)(orderItems)
  }

  return total
}

/**
 * @type { (orderItems: any[]) => number }
 */
const getWorkflowsCount = pipe(
  filter(orderItem => orderItem.productId === 'wf'),
  reduce((count, item) => count + item.quantity, 0)
)

const calculateTotalFromOrderItems = products =>
  reduce((total, item) => {
    if (item.productId === 'form') {
      return total + item.quantity * 89.99
    }

    return total + item.quantity * products[item.productId].price
  }, 0)
