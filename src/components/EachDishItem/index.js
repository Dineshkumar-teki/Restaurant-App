import {Component} from 'react'
import CartList from '../../context/CartList'
import './index.css'

class EachDishItem extends Component {
  state = {dishQuantity: 0}

  onDecreaseQuantity = () => {
    const {dishQuantity} = this.state
    if (dishQuantity > 0) {
      this.setState(prevState => ({dishQuantity: prevState.dishQuantity - 1}))
    }
  }

  onIncreaseQuantity = () => {
    this.setState(prevState => ({dishQuantity: prevState.dishQuantity + 1}))
  }

  render() {
    const {dishQuantity} = this.state
    const {dishItem} = this.props
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
    } = dishItem
    return (
      <CartList.Consumer>
        {value => {
          const {
            cartList,
            incrementCountValue,
            decrementCountValue,
            addDishToCart,
          } = value
          const decreaseQuantity = () => {
            decrementCountValue(dishItem)
          }
          const increaseQuantity = () => {
            incrementCountValue(dishItem)
          }
          const onAddToCartDish = () => {
            if (dishQuantity > 0) {
              addDishToCart({...dishItem, dishQuantity})
            }
          }
          const quant = cartList.filter(eachItem => eachItem.dishId === dishId)
          const quantValue = quant.length > 0 ? quant[0].quantity : 0
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
                    {dishCurrency} {dishPrice}
                  </p>
                  <p className="dishDescription">{dishDescription}</p>
                  {dishAvailability ? (
                    <div className="quantAndAddToCart">
                      <div className="dishCounter">
                        <button
                          type="button"
                          onClick={this.onDecreaseQuantity}
                          className="minus"
                        >
                          -
                        </button>
                        <p>{dishQuantity}</p>
                        <button
                          type="button"
                          onClick={this.onIncreaseQuantity}
                          className="add"
                        >
                          +
                        </button>
                      </div>
                      {dishQuantity > 0 ? (
                        <button
                          type="button"
                          className="addToCart"
                          onClick={onAddToCartDish}
                        >
                          ADD TO CART
                        </button>
                      ) : null}
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
            </li>
          )
        }}
      </CartList.Consumer>
    )
  }
}

export default EachDishItem
