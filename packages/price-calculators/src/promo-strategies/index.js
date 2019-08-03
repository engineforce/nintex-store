const assert = require('assert')
const errcode = require('err-code')

// It is hard to define good function names for promotions,
// they may cause more confusion than the promo codes, which
// are already known by the domain expert.
// Obviously, we can discuss about the pros and cons when working in
// the same office.
const strategies = {
  RRD4D32: require('./RRD4D32'),
  '44F4T11': require('./44F4T11'),
  FF9543D1: require('./FF9543D1'),
  YYGWKJD: require('./YYGWKJD'),
}

const ERR_INVALID_PROMO_CODE = 'ERR_INVALID_PROMO_CODE'

/**
 * @param {object} input
 * @param {string} input.promoCode
 * @param {any[]} input.orderItems
 * @param {Record<string, any>} input.products
 * @param {number} input.total
 *
 * @returns {number}
 */
function applyPromo({ promoCode, orderItems, products, total }) {
  assert(
    strategies[promoCode],
    errcode(
      new Error(`Promo ${promoCode} does not exist.`),
      ERR_INVALID_PROMO_CODE,
      {
        promoCode,
      }
    )
  )

  const promoStrategy = strategies[promoCode]
  return promoStrategy({ orderItems, products, total })
}

module.exports = { applyPromo, ERR_INVALID_PROMO_CODE }
