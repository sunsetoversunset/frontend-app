import { Link } from 'react-router-dom';
import "../styles/Landing.scss";
import '../styles/Buttons.scss';

const Landing = ({ setLandingOpen }: { setLandingOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div id='landing'>
      <div className='content'>
        <p>Landing text ... <Link to='/about'>About</Link> etc.</p>
        <button
          className='btn-rounded'
          onClick={() => setLandingOpen(false)}
        >
          Explore Sunset Over Sunset
        </button>
      </div>
    </div>
  )
}

export default Landing;