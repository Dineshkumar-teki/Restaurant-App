import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import EachTabItem from '../EachTabItem'
import EachDishItem from '../EachDishItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const pageViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

class HomeRoute extends Component {
  state = {
    tableMenuList: [],
    activeTabItem: '',
    categoryDishes: [],
    view: pageViews.initial,
    restaurantName: '',
  }

  componentDidMount() {
    this.getItemsData()
  }

  getItemsData = async () => {
    this.setState({view: pageViews.pending})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const formatedData = data.map(eachItem => ({
      branchName: eachItem.branch_name,
      nextUrl: eachItem.nexturl,
      restaurantId: eachItem.restaurant_id,
      restaurantImage: eachItem.restaurant_image,
      restaurantName: eachItem.restaurant_name,
      tableId: eachItem.table_id,
      tableMenuList: eachItem.table_menu_list,
      tableName: eachItem.table_name,
    }))
    const tabsList = formatedData[0].tableMenuList.map(eachItem => ({
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      categoryDishes: eachItem.category_dishes,
    }))
    this.setState({
      tableMenuList: tabsList,
      activeTabItem: tabsList[0].menuCategoryId,
      categoryDishes: tabsList[0].categoryDishes,
      view: pageViews.success,
      restaurantName: formatedData[0].restaurantName,
    })
  }

  alterTabItem = (id, categoryDishes) => {
    this.setState({activeTabItem: id, categoryDishes})
  }

  displayView = () => {
    const {
      view,
      categoryDishes,
      tableMenuList,
      activeTabItem,
      restaurantName,
    } = this.state
    const formatedCategoryDishes = categoryDishes.map(eachDishItem => ({
      addOnCat: eachDishItem.addonCat,
      dishType: eachDishItem.dish_Type,
      dishAvailability: eachDishItem.dish_Availability,
      dishCalories: eachDishItem.dish_calories,
      dishCurrency: eachDishItem.dish_currency,
      dishDescription: eachDishItem.dish_description,
      dishId: eachDishItem.dish_id,
      dishImage: eachDishItem.dish_image,
      dishName: eachDishItem.dish_name,
      dishPrice: eachDishItem.dish_price,
    }))
    switch (view) {
      case pageViews.pending:
        return (
          <div className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )
      case pageViews.success:
        return (
          <>
            <Navbar restaurantName={restaurantName} />
            <ul className="tabsList">
              {tableMenuList.map(eachItem => (
                <EachTabItem
                  key={eachItem.menuCategoryId}
                  tabItem={eachItem}
                  activeTab={activeTabItem === eachItem.menuCategoryId}
                  changeTabItem={this.alterTabItem}
                />
              ))}
            </ul>
            <ul className="dishesList">
              {formatedCategoryDishes.map(eachDishItem => (
                <EachDishItem
                  dishItem={eachDishItem}
                  key={eachDishItem.dishId}
                />
              ))}
            </ul>
          </>
        )
      default:
        return null
    }
  }

  render() {
    return <>{this.displayView()}</>
  }
}

export default HomeRoute
