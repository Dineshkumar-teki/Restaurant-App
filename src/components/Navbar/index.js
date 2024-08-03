import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartList from '../../context/CartList'
import './index.css'

const Navbar = props => {
  const {restaurantName} = props

  const onLogout = () => {
    Cookies.remove('JWT-Token')
    const {history} = props
    history.replace('/')
  }

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
            <Link to="/">
              <h1 className="restaurantName">{restaurantName}Home</h1>
            </Link>
            <div className="cartDetails">
              <p>My Orders</p>
              <Link to="/cart">
                <div className="cartContainer">
                  <AiOutlineShoppingCart className="cartIcon" />
                  <span className="cartCount">{cartList.length}</span>
                </div>
              </Link>
              <button type="button" onClick={onLogout} className="logoutBtn">
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartList.Consumer>
  )
}

export default withRouter(Navbar)
