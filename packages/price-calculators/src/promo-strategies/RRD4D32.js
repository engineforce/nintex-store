// 10% discount for orders above $1000 (pre-discount)

const assert = require('assert')
const errcode = require('err-code')

const THRESHOLD = 1000
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

  return total * 0.9
}
