import React from 'react'

const CountContext = React.createContext({
  count: 0,
  incrementCountValue: () => {},
  decrementCountValue: () => {},
})

export default CountContext
