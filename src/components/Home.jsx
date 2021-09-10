import { NavHeader } from './NavHeader';
import { NavLink } from 'react-router-dom';
import { Footer } from './Footer'

export const Home = () => {
  return (
    <div className="app-page">
      <NavHeader />
      <div className="app-links">
        <NavLink 
          className="tags"
          to="/map"
        >
          Take me to the street
        </NavLink>
        <NavLink to="/stories">
          Bring me on a tour
        </NavLink>
      </div>
      <Footer />
    </div>
  )
}
export default Home;