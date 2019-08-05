import { pipe, defaultTo } from 'ramda'

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

export const formatCurrency = pipe(
  parseFloat,
  defaultTo(0),
  formatter.format
)
