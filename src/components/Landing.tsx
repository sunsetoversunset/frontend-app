import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Landing.scss";
import '../styles/Buttons.scss';

const Landing = ({ setLandingOpen }: { setLandingOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div id='landing'>
      <div className='content'>
        <p>Landing text ... <Link to='/about'>About</Link> etc.</p>
        <button
          className='btn-rounded'
          onClick={() => {
            if (checked) {
              localStorage.setItem('SOSArrivalPopup', 'dontshow');
            }
            setLandingOpen(false);
          }}
        >
          Explore Sunset Over Sunset
        </button>

        <div className='dontshow'>
          <input
            type='checkbox'
            id='dontshowagain'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor='dontshowagain'>Don't show this again</label>
        </div>


      </div>
    </div>
  )
}

export default Landing;