const { pipe, reduce, when, pick, evolve } = require('ramda')
const { applyPromo } = require('./promo-strategies')

const calculateOrderPrice = pipe(
  /**
   * @param {object} input
   * @param {IOrderItem[]} input.orderItems
   * @param {Record<string, IProduct>} input.products
   * @param {string=} input.promoCode
   */
  ({ orderItems, promoCode, products }) => ({
    orderItems,
    products,
    promoCode,
    total: calculateTotalFromOrderItems({ products })(orderItems),
  }),
  when(
    ({ promoCode }) => !!promoCode,
    info => ({
      total: info.total,
      discountedTotal: applyPromo(info),
    })
  ),
  evolve({
    total: toPrice,
    discountedTotal: toPrice,
  }),
  pick(['total', 'discountedTotal'])
)

function toPrice(price) {
  // Using truncate instead of round, according to your example 2
  return Math.trunc(price * 100) / 100
}

/**
 * @param {object} input
 * @param {Record<string, IProduct>} input.products
 */
const calculateTotalFromOrderItems = ({ products }) =>
  reduce((total, item) => {
    return total + item.quantity * products[item.productId].price
  }, 0)

module.exports = {
  calculateOrderPrice,
}

/**
 * @typedef IOrderItem
 * @property {string} productId,
 * @property {number} quantity
 */

/**
 * @typedef IProduct
 * @property {string} productId
 * @property {number} price
 */
