import {Component} from 'react'
import CartList from '../../context/CartList'
import './index.css'

class EachDishItem extends Component {
  render() {
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
          const {cartList, incrementCountValue, decrementCountValue} = value
          const decreaseQuantity = () => {
            decrementCountValue(dishId)
          }
          const increaseQuantity = () => {
            incrementCountValue(dishId)
          }
          const quant = cartList.filter(eachItem => eachItem.id === dishId)
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
                    <div className="dishCounter">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="minus"
                      >
                        -
                      </button>
                      <p>{quantValue}</p>
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
            </li>
          )
        }}
      </CartList.Consumer>
    )
  }
}

export default EachDishItem
