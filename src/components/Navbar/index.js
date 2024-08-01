import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartList from '../../context/CartList'
import './index.css'

const Navbar = props => {
  const {restaurantName} = props
  return (
    <CartList.Consumer>
      {value => {
        const {cartList} = value
        let cartCount = 0
        if (cartList.length !== 0) {
          const quantityList = cartList.map(eachItem => eachItem.quantity)
          cartCount = quantityList.reduce((acc, sum) => acc + sum)
        }
        return (
          <nav>
            <h1 className="restaurantName">{restaurantName}</h1>
            <div className="cartDetails">
              <p>My Orders</p>
              <div className="cartContainer">
                <AiOutlineShoppingCart className="cartIcon" />
                <span className="cartCount">{cartCount}</span>
              </div>
            </div>
          </nav>
        )
      }}
    </CartList.Consumer>
  )
}

export default Navbar
