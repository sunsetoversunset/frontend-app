import { useMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Styled from './styled';
import iconHeader from "../../assets/icons/sos-logo-orange-text.png"

const NavHeader = () => {
  // if the pages is an addressview page, get it so you can set the panorama link to that address
  const match = useMatch(`address/:address`);
  let panoramaTo = '/';
  if (match) {
    const { address } = match.params;
    if (address && !isNaN(Number(address))) {
      const direction = (Number(address) % 2) ? 'n' : 's';
      panoramaTo += `${direction}/${address}`;
    }
  }

  return (
    <Styled.NavHeader>
      <Link to="/">
        <Styled.SOSImg
          src={iconHeader}
          alt="Sunset Over Sunset Icon"
        />
      </Link>
      <div>
        <Styled.NavLink to={panoramaTo}>
          Panorama
        </Styled.NavLink>
        <Styled.NavLink to='/stories'>
          Stories
        </Styled.NavLink>
        <Styled.NavLink to='/about'>
          About
        </Styled.NavLink>
      </div>
    </Styled.NavHeader>
  )
}

export default NavHeader;