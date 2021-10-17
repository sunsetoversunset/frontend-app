import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.scss';

export const NavHeader = () => {
  const navHeader  = useRef(null)


  return (
    <nav className='nav-header' ref={navHeader}>
      <Link className="home-link"to="/">
        <h1>Sunset over Sunset</h1>
      </Link>
      <div className='nav-links-container'>
        <ul>
          <li>
            <Link to='/panorama'>
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