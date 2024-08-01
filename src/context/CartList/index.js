import React from 'react'

const CountContext = React.createContext({
  cartList: [],
  incrementCountValue: () => {},
  decrementCountValue: () => {},
})

export default CountContext
