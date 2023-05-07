import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoriesMetadata } from '../../hooks';
import '../../styles/App.scss'

const Stories = () => {
  const storiesMetadata = useStoriesMetadata();
  return (
    <div className="app-page about-view" id="stories">
      <h1>Stories</h1>
      <p>Explanatory text ...</p>
      <ul>
        {storiesMetadata.map(d => (
          <li key={d.slug}>
            <Link to={d.slug}>
              <img src={`https://media.getty.edu/iiif/image/${d.img_id}/full/,300/0/default.jpg`} alt={d.title} />
              <h3>{d.title}</h3>
              <h4><strong>{d.author}</strong> {`${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.date.month - 1]} ${d.date.day}, ${d.date.year}`}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stories;