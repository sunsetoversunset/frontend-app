import "../styles/Buttons.scss"
import iconArrowLeft from "../assets/icons/icon-arrow-left.svg"
import iconArrowRight from "../assets/icons/icon-arrow-right.svg"
import iconSearch from "../assets/icons/icon-search.svg"

export const RoundedButton = (props) => {

  const renderIcon = () => {
    switch (props.icon) {
      case "icon-arrow-left":
        return <img src={iconArrowLeft} alt="icon-arrow-left" />

      case "icon-arrow-right":
        return <img src={iconArrowRight} alt="icon-arrow-right" />
      
      case "icon-search-filter":
        return <img src={iconSearch} alt="icon-search-and-filter" />

      default: 
        return null
    }
  }

  return (
    <button
      id={props.label === "Search & Filter" ? 'search' : ''} 
      className='btn-rounded'
      onClick={ () => props.handleOnClicked() }
    >
      {props.icon && props.icon !== "icon-arrow-right" ? renderIcon() : null}
      {props.label}
      {props.icon && props.icon === "icon-arrow-right" ? renderIcon() : null}
    </button>
  )
}