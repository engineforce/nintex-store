// 15% discount for orders above $1500 (pre-discount)

const assert = require('assert')
const errcode = require('err-code')

const THRESHOLD = 1500
const ERR_INVALID_TOTAL = 'ERR_INVALID_TOTAL'

module.exports = ({ total }) => {
  assert(
    total > THRESHOLD,
    errcode(
      new Error(`total: ${total} is less than ${THRESHOLD}`),
      ERR_INVALID_TOTAL,
      {
        total,
      }
    )
  )

  return total * 0.85
}
