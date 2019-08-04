import styled from 'styled-components'

export const Root = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  margin-top: 20px;
  list-style: none;
`

export const Product = styled.li`
  width: 20%;
  max-width: 200px;
  margin-left: 20px;
  margin-right: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const ProductName = styled.div``
