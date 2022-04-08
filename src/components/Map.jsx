import { useRef, useEffect, useState, useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import { DimensionsContext } from '../Contexts';
import { SearchAndFilter } from "./SearchAndFilter"
import { RoundedButton } from "./Buttons"
import * as d3 from 'd3'
import "../styles/Map.scss"
import sunsetJson from '../assets/data/sunset.json'
import { makePanoramaLink } from '../utiliities.ts';
import { crossStreets } from '../assets/data/crossStreets'
import iconMinimize from "../assets/icons/icon-minimize.svg"
import iconMaximize from "../assets/icons/icon-maximize.svg";
import '../styles/Map.scss';

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
export const Map = (props) => {
  const { width } = (useContext(DimensionsContext));
  const state = useParams();

  const direction = useParams().direction || 'n';


  // ---------------------------------------------------------
  return (
    <div
      className="map-inner"
      style={{
        zIndex: 10000,
      }}

    >
      <div className='map' />
      <div className="map-controls">
        <div className="map-controls-inner">
          <div className="map-controls-left">
            <Link
              to={makePanoramaLink(state, { type: 'scroll', payload: width * -0.4})}
            >
              <RoundedButton
                icon="icon-arrow-left"
                label={(direction === 'n') ? 'Head West' : 'Head East'}
              />
            </Link>
            <Link
              to={makePanoramaLink(state, { type: 'toggle_direction' })}
            >
              <RoundedButton
                label={`Direction: ${direction.toUpperCase()}`}
              />
            </Link>
          </div>
          <div className="map-controls-right">
            <RoundedButton
              isActive={props.isSearchAndFilterShowing}
              icon="icon-search-filter"
              label={'Search & Filter'}
              handleOnClicked={() => {
                props.setIsSearchAndFilterShowing(true)
              }}
            />
            <Link
              to={makePanoramaLink(state, { type: 'scroll', payload: width * 0.4})}
            >
              <RoundedButton
                icon="icon-arrow-right"
                label={(direction === 'n') ? 'Head East' : 'Head West'}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}