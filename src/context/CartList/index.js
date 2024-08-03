import React from 'react'

const CountContext = React.createContext({
  cartList: [],
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeAllCartItems: () => {},
  addDishToCart: () => {},
  removeCartItem: () => {},
})

export default CountContext
