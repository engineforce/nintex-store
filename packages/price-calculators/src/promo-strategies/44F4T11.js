// 15% discount for orders above $1500 (pre-discount)

const THRESHOLD = 1500

module.exports = ({ total }) => {
  if (total > THRESHOLD) {
    return total * 0.85
  }

  return total
}
