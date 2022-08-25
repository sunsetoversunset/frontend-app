import React from 'react';
import { useMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.scss';

const NavHeader = () => {
  // if the pages is an addressview page, get it so you can set the panorama link to that address
  const match = useMatch(`address/:address`);
  let panoramaTo = '/panorama';
  if (match) {
    const { address } = match.params;
    if (address && !isNaN(Number(address))) {
      const direction = (Number(address) % 2) ? 'n' : 's';
      panoramaTo += `/${direction}/${address}`;
    }
  }

  return (
    <nav className='nav-header'>
      <Link className="home-link"to="/">
        <h1>Sunset over Sunset</h1>
      </Link>
      <div className='nav-links-container'>
        <ul>
          <li>
            <Link to={panoramaTo}>
              <div className='nav-link'>
                Panorama
              </div>
            </Link>
          </li>
          <li>
            <Link to='/stories'>
              <div className='nav-link'>
                Stories
              </div>
            </Link>
          </li>
          <li>
            <Link to='/about'>
              <div className='nav-link'>
                About
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavHeader;