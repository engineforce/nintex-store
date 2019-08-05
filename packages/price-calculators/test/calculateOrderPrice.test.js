const { calculateOrderPrice } = require('../src/')

const PRODUCTS = {
  wf: {
    productId: 'wf',
    price: 199.99,
  },
  docgen: {
    productId: 'docgen',
    price: 9.99,
  },
  form: {
    productId: 'form',
    price: 99.99,
  },
}

describe('calculateOrderPrice', () => {
  describe('when buying 2 workflows without promo', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 2,
        },
      ],
      products: PRODUCTS,
    })
    it('should return the correct total price and no discounted price', () => {
      expect(price).toEqual({ total: 399.98 })
    })
  })

  describe('when buying 2 workflows with invalid promo', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 2,
        },
      ],
      promoCode: '1234',
      products: PRODUCTS,
    })
    it(`should return the correct total price, and discounted price that is 
        equal to the total price because promo code is not applicable`, () => {
      expect(price).toEqual({
        total: 399.98,
        discountedTotal: 399.98,
      })
    })
  })

  describe('when buying 6 workflows with promo RRD4D32', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 6,
        },
      ],
      products: PRODUCTS,
      promoCode: 'RRD4D32',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 1199.94,
        discountedTotal: 1079.94,
      })
    })
  })

  describe('when buying 5 workflows (total less $1000) with promo RRD4D32', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 5,
        },
      ],
      products: PRODUCTS,
      promoCode: 'RRD4D32',
    })
    it(`should return the correct total price, and discounted price that is 
        equal to the total price because promo code is not applicable`, () => {
      expect(price).toEqual({
        total: 999.95,
        discountedTotal: 999.95,
      })
    })
  })

  describe('when buying 10 workflows with promo 44F4T11', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 10,
        },
      ],
      products: PRODUCTS,
      promoCode: '44F4T11',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 1999.9,
        discountedTotal: 1699.91,
      })
    })
  })

  describe('when buying 6 workflows (less than $1500) with promo 44F4T11', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 6,
        },
      ],
      products: PRODUCTS,
      promoCode: '44F4T11',
    })
    it(`should return the correct total price, and discounted price that is 
        equal to the total price because promo code is not applicable`, () => {
      expect(price).toEqual({
        total: 1199.94,
        discountedTotal: 1199.94,
      })
    })
  })

  describe('when buying 1 form with promo YYGWKJD', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'form',
          quantity: 1,
        },
      ],
      products: PRODUCTS,
      promoCode: 'YYGWKJD',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 99.99,
        discountedTotal: 99.99,
      })
    })
  })

  describe('when buying 1 workflow and 1 form with promo YYGWKJD', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'wf',
          quantity: 1,
        },
        {
          productId: 'form',
          quantity: 1,
        },
      ],
      products: PRODUCTS,
      promoCode: 'YYGWKJD',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 299.98,
        discountedTotal: 289.98,
      })
    })
  })

  describe('when buying 9 documents with promo FF9543D1', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'docgen',
          quantity: 9,
        },
      ],
      products: PRODUCTS,
      promoCode: 'FF9543D1',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 89.91,
        discountedTotal: 89.91,
      })
    })
  })

  describe('when buying 10 documents with promo FF9543D1', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'docgen',
          quantity: 10,
        },
      ],
      products: PRODUCTS,
      promoCode: 'FF9543D1',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 99.9,
        discountedTotal: 89.9,
      })
    })
  })

  describe('when buying 10 documents and 1 wf with promo FF9543D1', () => {
    const price = calculateOrderPrice({
      orderItems: [
        {
          productId: 'docgen',
          quantity: 10,
        },
        {
          productId: 'wf',
          quantity: 1,
        },
      ],
      products: PRODUCTS,
      promoCode: 'FF9543D1',
    })
    it('should return the correct total price and discounted price', () => {
      expect(price).toEqual({
        total: 299.89,
        discountedTotal: 289.89,
      })
    })
  })
})
