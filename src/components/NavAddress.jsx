import { Link, useLocation } from 'react-router-dom';
import '../styles/NavHeader.scss';

export const NavAddress = () => {
  let location = useLocation();

  return (
    <nav className='nav-header'>
      <div className='nav-links-container'>
        <ul>
          <li>
            <Link to={{pathname: location.pathname,
                      hash: '#Photographs'}}>
              <div className='nav-link'>
                Photographs
              </div>
            </Link>
          </li>
          <li>
            <Link to={{pathname: location.pathname,
                      hash: '#Stories'}}>
              <div className='nav-link'>
                Stories
              </div>
            </Link>
          </li>
          <li>
            <Link to={{pathname: location.pathname,
                      hash: '#Tags'}}>
              <div className='nav-link'>
                Tags
              </div>
            </Link>
          </li>
          <li>
            <Link to={{pathname: location.pathname,
                      hash: '#HistoricalProfile'}}>
              <div className='nav-link'>
                Historical Profile
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}