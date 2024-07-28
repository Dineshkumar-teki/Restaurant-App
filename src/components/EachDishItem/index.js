import {Component} from 'react'
import './index.css'

class EachDishItem extends Component {
  state = {count: 0}

  decreaseQuantity = () => {
    const {count} = this.state

    if (count > 0) {
      this.setState(
        prevState => ({count: prevState.count - 1}),
        this.minusCartItem,
      )
    }
  }

  minusCartItem = () => {
    const {decreaseCartCount} = this.props
    decreaseCartCount()
  }

  incrementQuantty = () => {
    this.setState(prevState => ({count: prevState.count + 1}), this.addCartItem)
  }

  addCartItem = () => {
    const {increaseCartCount} = this.props
    increaseCartCount()
  }

  render() {
    const {dishItem} = this.props
    const {count} = this.state
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
    } = dishItem
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
                  onClick={this.decreaseQuantity}
                  className="minus"
                >
                  -
                </button>
                <p>{count}</p>
                <button
                  type="button"
                  onClick={this.incrementQuantty}
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
  }
}

export default EachDishItem
