import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  margin-top: 20px;
`

export const Grid = styled.ul`
  width: 100%;
`

export const Row = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const HeaderRow = styled(Row)`
  font-weight: bold;
`

export const Column = styled.div``

export const DescriptionColumn = styled(Column)`
  flex: 1;
`

export const PriceColumn = styled(Column)`
  width: 100px;
`

export const QuantityColumn = styled(Column)`
  width: 100px;
`

export const Product = styled.div`
  display: flex;
`

export const ProductImageWrapper = styled.div`
  width: 100px;
  margin-right: 10px;
`

export const Input = styled.input`
  padding-left: 5px;
  padding-right: 5px;
  width: 80%;
`
