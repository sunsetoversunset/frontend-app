import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/Buttons.scss';

const StyledLanding = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: 10000;

  .content {
    font-size: 1.2em;
    line-height: 1.5;
    position: fixed;
    width: 500px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-top: -200px; /* Negative half of height. */
    margin-left: -270px; /* Negative half of width. */
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;

    span {
      text-decoration: underline;
      font-weight: 700;
      color: #E95414;

      &:hover {
        color: #AD3400;
      }
    }

    padding: 20px;

    button {
      margin: 10px auto;
    }
  }

  .dontshow {
    font-size: 0.9em;
    text-align: right;
  }
`;


const Landing = ({ setLandingOpen }: { setLandingOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const closeAndNavigate = (to: string) => {
    if (checked) {
      localStorage.setItem('SOSArrivalPopup', 'dontshow');
    }
    setLandingOpen(false);
    navigate(to);
  }

  return (
    <StyledLanding>
      <div className='content'>
        <p>Welcome to Sunset Over Sunset, a project that explores the histories of Los Angeles's iconic Sunset Boulevard through the photographs of artist Ed Ruscha. Find out <span onClick={() => { closeAndNavigate("/about"); }}>About</span> the project's goals and contexts. Navigate across space and time on the <span onClick={() => { closeAndNavigate('/n/9155-124/1966,1973,1985,1995,2007'); }}>Panorama</span>. Click locations on the address band (e.g. < span onClick={() => { closeAndNavigate("/address/9155"); }}> 9155</span>) to learn more about each property. Click on individual photos to zoom in and examine each image in detail. And discover narrative <span onClick={() => { closeAndNavigate("/stories"); }}>Stories</span> that knit together the photographs to reveal Sunset through broader historical themes.</p>
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
    </StyledLanding>
  )
}

export default Landing;