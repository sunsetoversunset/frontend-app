import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { Home } from './Home'
import StoriesView from './Stories/Index'
import Story from './Stories/StoriesView';
import StoryMd from './Stories/Story';
import Panorama from './Panorama/Index';
import NavHeader from './NavHeader/Index';
import About from './Pages/About/Index';
import AddressView from './Address/Index';
import Footer from './Footer/Index';
import Landing from "./Landing/Index";
import { AppContext } from '../Contexts';
import { getAddressOffsetString } from '../utiliities';
import type { Dimensions } from '../index.d';
import { sizes } from '../constants';
import * as Styled from './styled';

export const App = () => {
  const [landingOpen, setLandingOpen] = useState(localStorage.getItem('SOSArrivalPopup') !== 'dontshow');
  const calculateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    const { clientWidth, clientHeight } = (document.documentElement) ? document.documentElement : { clientWidth: null, clientHeight: null };
    const width = clientWidth || innerWidth;
    let media: Dimensions["media"];
    if (width < sizes.tablet) {
      media = 'phone';
    } else if (width >= sizes.tablet && width < sizes.laptop) {
      media = 'tablet';
    } else {
      media = 'laptop';
    }
    const dimensions: Dimensions = {
      width,
      height: clientHeight || innerHeight,
      media,
    };

    return dimensions;
  };

  const [dimensions, setDimensions] = useState<Dimensions>(calculateDimensions());
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);

  // use the width to set the preliminary western position if the address isn't specified
  const defaultAddressNorth = (dimensions.width)
    ? getAddressOffsetString(dimensions.width / 2, 'n', { direction: 'n' })
    : 'DohenyRoad';
  const defaultAddressSouth = (dimensions.width)
    ? getAddressOffsetString(dimensions.width / 2, 's', { direction: 's' })
    : '9176';

  // --------------------------------------------------------------------
  return (
    <AppContext.Provider value={{ ...dimensions, modalActive, setModalActive }}>
      <Styled.FontStyles />
      <Styled.GlobalStyle />
      <div className="app">
        <Router basename={'/'}>
          <NavHeader />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/stories">
              <Route
                index
                element={<StoriesView />}
              />
              <Route
                path='gasstationsold'
                element={<Story />}
              />
              <Route path=":storyslug" element={<StoryMd />} />
            </Route> 
            <Route path="/address/">
              <Route path=":address" element={<AddressView />} />
            </Route>
            <Route
              path='/'
            >
              <Route
                index
                element={<Navigate replace to={`n/${defaultAddressNorth}/1966,1973,1985,1995,2007`} />}
              />
              <Route
                path='n'
                element={<Navigate replace to={`${defaultAddressNorth}/1966,1973,1985,1995,2007`} />}
              />
              <Route
                path='s'
                element={<Navigate replace to={`${defaultAddressSouth}/1966,1973,1985,1995,2007`} />}
              />
              <Route
                path=':direction'
              >
                <Route
                  path=':addrOffset'
                >
                  <Route
                    index
                    element={<Navigate replace to='1966,1973,1985,1995,2007' />}
                  />
                  <Route
                    path=':years'
                    element={<Panorama />}
                  />
                </Route>
              </Route>

              <Route path='refine'>
                <Route
                  path=':direction'
                >
                  <Route
                    path=':addrOffset'
                  >
                    <Route
                      index
                      element={<Navigate replace to='1966,1973,1985,1995,2007' />}
                    />
                    <Route
                      path=':years'
                      element={<Panorama />}
                    />
                  </Route>
                </Route>
              </Route>

            </Route>

          </Routes>
          <Footer />
          {(landingOpen && <Landing setLandingOpen={setLandingOpen} />)}
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;