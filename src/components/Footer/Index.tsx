import iconFooter from "../../assets/icons/icon-sos-footer.svg";
import * as Styled from './styled';

const Footer = () => {
  return (
    <Styled.Footer>
      <Styled.Graphic>
        <Styled.SunsetOverSunsetIcon src={iconFooter} alt="icon-footer" />
      </Styled.Graphic>
      <Styled.Credit>
        <span>All images © Ed Ruscha. Used with permission.</span>
      </Styled.Credit>
    </Styled.Footer>
  )
}

export default Footer;