import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import csvToJson from 'csvtojson';
import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { Home } from './Home'
import { StoriesView } from './Stories/StoriesView'
import Panorama from './Panorama/Index';
import NavHeader from './NavHeader';
import About from './Pages/About.jsx';
import AddressView from './Address/Index';
import Footer from './Footer';
import Landing from "./Landing";
import { AppContext } from '../Contexts';
import { getClosestAddressBelowString } from '../utiliities';
import type { StripLabel, Dimensions } from '../index.d';

export const App = () => {
  const [landingOpen, setLandingOpen] = useState(true);

  const calculateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    const { clientWidth, clientHeight } = (document.documentElement) ? document.documentElement : { clientWidth: null, clientHeight: null };
    const width = clientWidth || innerWidth;
    let media: Dimensions["media"];
    if (width <= 480) {
      media = 'phone';
    } else if (width < 900) {
      media = 'tablet-portrait';
    } else {
      media = 'desktop';
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

  const [labels, setLabels] = useState<StripLabel[]>([]);

  const fetchData = async () => {
    const responses = await axios.all(
      [axios.get(`/data/strip_labels_n.csv`, { responseType: 'blob', }),
      axios.get(`/data/strip_labels_s.csv`, { responseType: 'blob', })]
    );
    const n_labels_str = await responses[0].data.text();
    let n_labels = await csvToJson().fromString(n_labels_str);
    n_labels = n_labels
      .map((label: { label: string, coordinate: string }) => ({
        label,
        coordinate: parseFloat(label.coordinate),
        direction: 'n',
      }));
    const s_labels_str = await responses[1].data.text(0);
    let s_labels = await csvToJson().fromString(s_labels_str);
    s_labels = s_labels
      .map((label: { label: string, coordinate: string }) => ({
        label,
        coordinate: parseFloat(label.coordinate),
        direction: 's',
      }));
    const labels = [...n_labels, ...s_labels];
    // the multiplier used for the placement of the photos on the strip for the panorama view
    const mult = 200;
    // the maximum coordinate value among all the addresses
    const maxX = Math.max(...labels.map(d => d.coordinate * mult));
    console.log(maxX);

    console.log(labels);
  };
  useEffect(() => {
    fetchData();

    //   .then(async (responses) => {
    //     const strip_labels = await responses.map(async (response) => {
    //       const csvStr: string = await response.data.text();
    //       const strip_labels = await csvToJson().fromString(csvStr) as StripLabel[];
    //       console.log(strip_labels);
    //       return strip_labels;
    //       // response.data.text().then((csvStr: string) => {
    //       //   csvToJson()
    //       //     .fromString(csvStr)
    //       //     .then((jsonObj) => {
    //       //       strip_labels.push(...jsonObj);
    //       //     });
    //       // });
    //     });
    //     console.log(strip_labels);
    //   })
    // .catch((reason: AxiosError) => {
    //   console.warn('failed to retrieve strip labels')
    // });
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    return () => { source.cancel(); }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);

  // use the width to set the preliminary western position if the address isn't specified
  const defaultAddressNorth = (dimensions.width)
    ? getClosestAddressBelowString(dimensions.width / 2, { direction: 'n' })
    : 'DohenyRoad';
  const defaultAddressSouth = (dimensions.width)
    ? getClosestAddressBelowString(dimensions.width / 2, { direction: 's' })
    : '9176';

  // --------------------------------------------------------------------
  return (
    <AppContext.Provider value={{ ...dimensions, modalActive, setModalActive }}>
      <div className="app">
        <Router basename={'/'}>
          <NavHeader />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/stories" element={<StoriesView />} />
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