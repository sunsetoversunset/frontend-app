import { useState, useEffect } from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Home'
import { StoriesView } from './StoriesView'
import Panorama from './Panorama';
import NavHeader from './NavHeader';
import { Contact } from './Contact'
import { Team } from './Team'
import { About } from './About'
import { AddressView } from './AddressView';
import Footer from './Footer';
import { DimensionsContext } from '../Contexts.ts';

export const App = () => {

  const calculateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    const { clientWidth, clientHeight } = (document.documentElement) ? document.documentElement : { clientWidth: null, clientHeight: null };
    const dimensions = {
      width: clientWidth || innerWidth,
      height: clientHeight || innerHeight,
    };

    if (dimensions.width <= 480) {
      dimensions.media = 'phone';
    } else if (dimensions.width < 900) {
      dimensions.media = 'tablet-portrait';
    } else {
      dimensions.media = 'desktop';
    }
    dimensions.dataViewerWidth = (dimensions.media !== 'phone') ? Math.max(400, Math.min(700, dimensions.width / 3)) : dimensions.width;

    return dimensions;
  };

  const [dimensions, setDimensions] = useState(calculateDimensions());

  useEffect(() => {
    window.addEventListener('resize', () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);

  // --------------------------------------------------------------------
  return (
    <DimensionsContext.Provider value={dimensions}>
      <div className="app">
        <Router basename={'/'}>
          <NavHeader />
          <Routes>
            <Route path="/about" element={About} />
            <Route path="/stories" element={StoriesView} />
            <Route path="/contact" element={Contact} />
            <Route path="/team" element={Team} />
            <Route path="/address/:address" element={AddressView} />
            <Route
              path='/panorama'
            >
              <Route
                index
                element={<Navigate replace to='n/DohenyRoad/1966,1973,1985,1995,2007' />}
              />
              <Route
                path='n'
                element={<Navigate replace to='DohenyRoad/1966,1973,1985,1995,2007' />}
              />
              <Route
                path='s'
                element={<Navigate replace to='9176/1966,1973,1985,1995,2007' />}
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
            </Route>

          </Routes>
          <Footer />
        </Router>
      </div>
    </DimensionsContext.Provider>
  );
}

export default App;