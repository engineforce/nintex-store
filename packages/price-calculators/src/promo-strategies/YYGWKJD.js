// YYGWKJD	Reduces the form price to $89.99 a unit when at least 1 wf is purchased

const assert = require('assert')
const errcode = require('err-code')
const { pipe, filter, reduce } = require('ramda')

const THRESHOLD = 1
const ERR_WF_COUNT = 'ERR_WF_COUNT'

module.exports = ({ orderItems, products }) => {
  assert(
    getWorkflowsCount(orderItems) >= THRESHOLD,
    errcode(
      new Error(`Number of workflows are less than ${THRESHOLD}`),
      ERR_WF_COUNT
    )
  )

  return calculateTotalFromOrderItems(products)(orderItems)
}

/**
 * @type { (orderItems: any[]) => number }
 */
const getWorkflowsCount = pipe(
  filter(orderItem => orderItem.productId == 'wf'),
  reduce((count, item) => count + item.quantity, 0)
)

const calculateTotalFromOrderItems = products =>
  reduce((total, item) => {
    if (item.productId === 'form') {
      return total + item.quantity * 89.99
    }

    return total + item.quantity * products[item.productId].price
  }, 0)
