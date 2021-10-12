import { React } from 'react';
import '../styles/App.scss';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home'
import { StoriesView } from './StoriesView'
import { MapView } from './MapView'
import { Contact } from './Contact'
import { Team } from './Team'
import { About } from './About'
import { AddressView } from './AddressView'

export const App = () => {
  
  // --------------------------------------------------------------------
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route path="/about" component={ About }/>
          <Route path="/stories" component={ StoriesView }/>
          <Route 
            path="/panorama" 
            render={() => (
              <MapView />
            )}
          />
          <Route path="/contact" component = { Contact } />
          <Route path="/team" component={ Team } />
          <Route path={["/address/:address", "/address"]} component={ AddressView } />
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
  );
}

export default App;