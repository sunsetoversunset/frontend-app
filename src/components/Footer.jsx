import "../styles/Footer.scss"
import iconFooter from "../assets/icons/icon-sos-footer.svg"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-graphic">
        <img className="footer-hero" src={iconFooter} alt="icon-footer" />
      </div>
      <div className="ruscha-credit">
        <span>All images © Ed Ruscha. Used with permission.</span>
      </div>
    </footer>
  )
}