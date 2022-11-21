import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/App.scss'
import '../../styles/Stories.scss' 

const Stories = () => {
  return (
    <div className="app-page about-view" id="stories">
      <ul>
        <li>
          <Link to='gasstations'>
            <img src='https://media.getty.edu/iiif/image/5deb7e9f-cc95-4cbd-9e94-29d154d01da2/full/,300/0/default.jpg' />
            The Gradual Disappearance of Gas Stations on Sunset</Link>
        </li>
      </ul>
    </div>
  );
};

export default Stories;