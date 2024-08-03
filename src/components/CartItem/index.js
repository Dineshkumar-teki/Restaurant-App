import {Component} from 'react'
import CartList from '../../context/CartList'
import './index.css'

class CartItem extends Component {
  render() {
    const {eachItem} = this.props
    const {
      dishType,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishImage,
      dishName,
      dishPrice,
      addOnCat,
      dishId,
      dishQuantity,
    } = eachItem
    return (
      <CartList.Consumer>
        {value => {
          const {incrementQuantity, decrementQuantity, removeCartItem} = value
          const decreaseQuantity = () => {
            if (dishQuantity > 1) {
              decrementQuantity(dishId)
            } else {
              removeCartItem(dishId)
            }
          }
          const increaseQuantity = () => {
            incrementQuantity(dishId)
          }
          const onRemoveCartItem = () => {
            removeCartItem(dishId)
          }
          return (
            <li className="dishItem">
              <div className="dishDetails">
                {dishType === 1 ? (
                  <img
                    src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                    alt="non-veg"
                    className="dishType"
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/?size=100&id=61083&format=png&color=000000"
                    alt="veg"
                    className="dishType"
                  />
                )}
                <div>
                  <h3>{dishName}</h3>
                  <p className="dishPrice">
                    {dishCurrency} {dishPrice} * {dishQuantity} = {dishCurrency}{' '}
                    {parseFloat(dishPrice) * parseInt(dishQuantity)}
                  </p>
                  <p className="dishDescription">{dishDescription}</p>
                  {dishAvailability ? (
                    <div className="dishCounter">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="minus"
                      >
                        -
                      </button>
                      <p>{dishQuantity}</p>
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="add"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="notAvailable">Not available</p>
                  )}
                  {addOnCat.length > 0 ? (
                    <p className="addOn">Customizations available</p>
                  ) : null}
                </div>
              </div>
              <p className="dishCalories">{dishCalories} calories</p>
              <img src={dishImage} alt={dishName} className="dishImg" />
              <button
                type="button"
                className="removeItemBtn"
                onClick={onRemoveCartItem}
              >
                X
              </button>
            </li>
          )
        }}
      </CartList.Consumer>
    )
  }
}

export default CartItem
