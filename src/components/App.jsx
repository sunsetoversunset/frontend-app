import { useState, useEffect } from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { Home } from './Home'
import { StoriesView } from './StoriesView'
import Panorama from './Panorama/Index.tsx';
import NavHeader from './NavHeader';
import { PhotoViewerModal } from './PhotoViewerModal.jsx';
import PhotoViewerModalTSX from './PhotoViewerModal.tsx';
import { Contact } from './Contact'
import { Team } from './Team'
import { About } from './About'
import AddressView from './AddressView/Index.tsx';
import Footer from './Footer';
import { AppContext } from '../Contexts.ts';

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
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);

  // --------------------------------------------------------------------
  return (
    <AppContext.Provider value={{...dimensions, modalActive, setModalActive}}>
      <div className="app">
        <Router basename={'/'}>
          <NavHeader />
          <Routes>
            <Route path="/about" element={About} />
            <Route path="/stories" element={StoriesView} />
            <Route path="/contact" element={Contact} />
            <Route path="/team" element={Team} />
            <Route path="/address/">
              <Route path=":address" element={<AddressView />} />
            </Route>
            <Route path='/imagereference' element={<PhotoViewerModal
              nearbyAddresses={['707', '9156']}
              imgObj={{ id: 'a77dc2a3-d5ee-4fa3-b188-6cfd5e65f507' }}
              handleHideModal={() => false}
              isVisible={true}
            />} />
            <Route path='/image/:id' element={<PhotoViewerModalTSX />} />
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
    </AppContext.Provider>
  );
}

export default App;