import Navbar from '../Navbar'
import CartList from '../../context/CartList'
import CartItem from '../CartItem'
import './index.css'

const CartRoute = () => (
  <>
    <Navbar />
    <CartList.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const onRemoveAllItems = () => {
          removeAllCartItems()
        }
        return (
          <>
            {cartList.length > 0 ? (
              <div className="cartList">
                <button
                  type="button"
                  className="removeBtn"
                  onClick={onRemoveAllItems}
                >
                  Remove All
                </button>
                <ul className="cartItems">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.dishId} eachItem={eachItem} />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="emptyCartSection">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt=""
                />
                <h1>Cart is Empty</h1>
              </div>
            )}
          </>
        )
      }}
    </CartList.Consumer>
  </>
)

export default CartRoute
