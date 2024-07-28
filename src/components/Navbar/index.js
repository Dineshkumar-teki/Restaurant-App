import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Navbar = props => {
  const {cartCount, restaurantName} = props
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
}

export default Navbar
