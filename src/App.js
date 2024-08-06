import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import CartList from './context/CartList'
import CartRoute from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {cartList: []}

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        return {
          ...eachItem,
          dishQuantity: eachItem.dishQuantity - 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dishId === id) {
        return {
          ...eachItem,
          dishQuantity: eachItem.dishQuantity + 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = dishDetails => {
    const {cartList} = this.state
    const dishesIds = cartList.map(eachItem => eachItem.dishId)
    if (dishesIds.includes(dishDetails.dishId)) {
      const updatedCartList = cartList.map(eachdish => {
        if (eachdish.dishId === dishDetails.dishId) {
          return {
            ...eachdish,
            dishQuantity: eachdish.dishQuantity + dishDetails.dishQuantity,
          }
        }
        return eachdish
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState({cartList: [...cartList, dishDetails]})
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.dishId !== id),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartList.Provider
        value={{
          cartList,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
        </Switch>
      </CartList.Provider>
    )
  }
}

export default App
