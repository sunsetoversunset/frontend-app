import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavHeader.scss';

export const NavHeader = () => {
  const navHeader  = useRef(null)
  
  let lastScrollTop = 0
  let lowerNav = document.querySelector('.address-lower-nav')
  window.onscroll = (e) =>{
      let st = window.pageYOffset
      if (st > lastScrollTop && st >= 40){
        navHeader.current.style.top = "-40px"
        if(lowerNav){
          lowerNav.style.top = "0px"
        }
     } else if(st < lastScrollTop){
        navHeader.current.style.top = "0px"
        if(lowerNav){
        lowerNav.style.top = "40px"
        }
     }
     lastScrollTop = st <= 0 ? 0 : st;
  }


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