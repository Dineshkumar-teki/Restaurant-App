import './index.css'

const EachTabItem = props => {
  const {tabItem, activeTab, changeTabItem} = props
  const {menuCategory, menuCategoryId, categoryDishes} = tabItem
  const isActive = activeTab ? 'active' : ''

  const tabItemChange = () => {
    changeTabItem(menuCategoryId, categoryDishes)
  }

  return (
    <li className={isActive} onClick={tabItemChange}>
      <button type="button" className="tab">
        {menuCategory}
      </button>
    </li>
  )
}

export default EachTabItem
