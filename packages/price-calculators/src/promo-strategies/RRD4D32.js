// 10% discount for orders above $1000 (pre-discount)
const THRESHOLD = 1000

module.exports = ({ total }) => {
  if (total > THRESHOLD) {
    return total * 0.9
  }

  return total
}
