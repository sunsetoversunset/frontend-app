import { useState, useEffect } from 'react';
import '../styles/App.scss';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home'
import { StoriesView } from './StoriesView'
import { MapView } from './MapView'
import { Contact } from './Contact'
import { Team } from './Team'
import { About } from './About'
import { AddressView } from './AddressView'
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
        <HashRouter>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/stories" component={StoriesView} />
            <Route
              path={['/panorama/direction/:direction/addr/:addr/offset/:offset', '/panorama/direction/:direction/addr/:addr', '/panorama/direction/:direction', '/panorama']}
              render={() => (
                <MapView />
              )}
            />
            <Route path="/contact" component={Contact} />
            <Route path="/team" component={Team} />
            <Route path={["/address/:address", "/address"]} component={AddressView} />
            <Route
              path="/"
              render={() => {
                return (
                  <Redirect to="/panorama" />
                )
              }}
            />
          </Switch>
        </HashRouter>
      </div>
    </DimensionsContext.Provider>
  );
}

export default App;