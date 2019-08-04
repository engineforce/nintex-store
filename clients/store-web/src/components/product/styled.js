import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  margin-top: 20px;
  list-style: none;
`

export const ImageWrapper = styled.div`
  width: 50%;
  max-width: 300px;
`

export const Info = styled.div`
  width: 50%;
`

export const QuantityWrapper = styled.div`
  margin-top: 10px;
`

export const Input = styled.input`
  padding: 5px;
`

export const AddButton = styled.button`
  margin-top: 20px;
  color: rgb(255, 124, 89);
  padding: 5px 30px;
`

export const Hr = styled.hr`
  margin-top: 30px;
`
