import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';


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
    <Styled.Landing>
      <Styled.Content>
        <p>Welcome to Sunset Over Sunset, a project that explores the histories of Los Angeles's iconic Sunset Boulevard through the photographs of artist Ed Ruscha. Find out <span onClick={() => { closeAndNavigate("/about"); }}>About</span> the project's goals and contexts. Navigate across space and time on the <span onClick={() => { closeAndNavigate('/n/9155-124/1966,1973,1985,1995,2007'); }}>Panorama</span>. Click locations on the address band (e.g. < span onClick={() => { closeAndNavigate("/address/9155"); }}> 9155</span>) to learn more about each property. Click on individual photos to zoom in and examine each image in detail. And discover narrative <span onClick={() => { closeAndNavigate("/stories"); }}>Stories</span> that knit together the photographs to reveal Sunset through broader historical themes.</p>
        <Styled.RoundedButton 
          onClick={() => {
            if (checked) {
              localStorage.setItem('SOSArrivalPopup', 'dontshow');
            }
            setLandingOpen(false);
          }}
        >
          Explore Sunset Over Sunset
        </Styled.RoundedButton>

        <Styled.DontShow>
          <input
            type='checkbox'
            id='dontshowagain'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor='dontshowagain'>Don't show this again</label>
        </Styled.DontShow>
      </Styled.Content>
    </Styled.Landing>
  )
}

export default Landing;