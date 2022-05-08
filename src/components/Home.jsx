
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="app-page">
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
    </div>
  )
}
export default Home;