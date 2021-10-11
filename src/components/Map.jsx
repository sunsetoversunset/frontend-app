import { useRef, useEffect, useState } from "react"
import { SearchAndFilter } from "./SearchAndFilter"
import { RoundedButton } from "./Buttons"
import * as d3 from 'd3'
import "../styles/Map.scss"
import sunsetJson from '../assets/data/sunset.json'
import { crossStreets } from '../assets/data/crossStreets'
import iconMinimize from "../assets/icons/icon-minimize.svg"
import iconMaximize from "../assets/icons/icon-maximize.svg"

// ---------------------------------------------------------
// In case it's useful later - handling responsiveness:  
// https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
// ---------------------------------------------------------
export const Map = (props) => {
  const mapContainer          = useRef(null)
  const d3Container           = useRef(null)
  const [xDomain, setXDomain] = useState([])
  const [yDomain, setYDomain] = useState([])
  const [bbox, setBbox]       = useState({});
  const defaultZoomRange      = [-118.37975, -118.37827] 

  // ---------------------------------------------------------
  const set = () => {
    setBbox(mapContainer && mapContainer.current ? mapContainer.current.getBoundingClientRect() : {});
  }
   
  // ---------------------------------------------------------
  const calcExtents = () => {
    let coords = sunsetJson.features[0].geometry.coordinates
    let xCoords = []
    let yCoords = []
    for (let i = 0; i < coords.length; i++) {
      xCoords.push(coords[i][0])
      yCoords.push(coords[i][1])
    }
    setXDomain(d3.extent(xCoords))
    setYDomain(d3.extent(yCoords))
  }

  // ---------------------------------------------------------
  useEffect(() => {
    if (sunsetJson !== null) {
      calcExtents()
    } 
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])


  // ---------------------------------------------------------
  useEffect(() => {
    if (props.allAddresses.length > 0) {
      props.setZoomRange([defaultZoomRange[0], defaultZoomRange[1]])
    }
  }, [props.allAddresses])


  // ---------------------------------------------------------
  useEffect(() => {
    const handleArrowKeyScroll = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (e.key === 'ArrowRight') {
          handleScroll('east')
        } else if (e.key === 'ArrowLeft') {
          handleScroll('west')
        }
      }
    }

    document.addEventListener('keydown', handleArrowKeyScroll)
    return () => document.removeEventListener("keydown", handleArrowKeyScroll);
  })

  // ---------------------------------------------------------
  const xScaleCoord = d3.scaleLinear()
    .domain([xDomain[0], xDomain[1]])
    .range([0, bbox.width])

  const yScaleCoord = d3.scaleLinear()
    .domain([yDomain[0], yDomain[1]])
    .range([bbox.height/4, 0])

  const line = d3.line()
    .x(d => xScaleCoord(d[0]))
    .y(d => yScaleCoord(d[1]) + bbox.height/2)
    .curve(d3.curveCatmullRom.alpha(1))

  const xScaleCrossStreets = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, bbox.width])

  // ---------------------------------------------------------
  // Renders svg map and brush controls
  // ---------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(d3Container.current)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      
    // clear out before we draw
    svg.selectAll("*").remove();
    
    // draw cross street lines
    svg.selectAll('cross-street')
      .data(crossStreets)
      .enter()
      .append('line')
      .style("stroke", "#949494")
      .style("stroke-dasharray", ("6, 6"))
      .attr('class', 'cross-street')
      .attr("x1", function(d) { return xScaleCrossStreets(d.idx) })
      .attr("y1",  function() { return 0 })
      .attr('x2', function(d) { return xScaleCrossStreets(d.idx) })
      .attr("y2", function() { return bbox.height })

    // draw line map
    svg.append('path')
      .datum(sunsetJson.features[0].geometry.coordinates)
      .attr('d', line)
      .attr("stroke", "black")
      .attr("stroke-width", "6")
      .attr("fill", "none")
  
    // draw street names
    svg.selectAll('cross-street-name')
      .data(crossStreets)
      .enter()
      .append("text")
      .attr("class", "cross-street-name")
      .attr("transform", "rotate(-90)")
      .attr("transform", function(d) {
        return "translate(" + xScaleCrossStreets(d.idx) + "," + 0 + ") rotate(90)";
      })
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .attr("font-size", "8px")
      .style("fill", "black")
      .style("text-anchor", "start")
      .text(function(d) { return d.street });
    
    // draw brush controls
    svg.append("g")
      .call(brush)
      .call(brush.move, [defaultZoomRange[0], defaultZoomRange[1]].map(x))
      .call(g => {
        g.select(".overlay")
          .datum({type: "selection"})
      });
  }, [xDomain, yDomain, bbox])
  

  // ---------------------------------------------------------
  // Brush controls
  // ---------------------------------------------------------
  const handleBrushEnd = (event) => {
    if (event.selection === null) return
    const [x0, x1] = event.selection.map(x.invert);
    console.log(`[handleBrushEnd]: ${x0}, ${x1}`)
    props.setZoomRange([x0, x1])
  }

  const brushed = (event) => {
    // if (event.selection === null) return
    // const [x0, x1] = event.selection.map(x.invert);
    // console.log(`${x0}, ${x1}`)
    // TODO: figure out how to highlight north or south part of selection?
  }

  const x = d3.scaleLinear([xDomain[0], xDomain[1]], [0, bbox.width])
  const brush = d3.brushX()
    .extent([[0, 0], [bbox.width, bbox.height]])
    .on("start brush end", brushed)
    .on("end", handleBrushEnd);


  // ---------------------------------------------------------
  const handleScroll = (direction) => {
    let rangeDiff = props.zoomRange[1] - props.zoomRange[0]   
    let lBounds, rBounds
    if (direction === 'west') {
      lBounds = props.zoomRange[0] - rangeDiff
      rBounds = props.zoomRange[0]
      if (lBounds < xDomain[0]) {
        lBounds = xDomain[0]
        rBounds = xDomain[0] + rangeDiff
        props.setZoomRange([xDomain[0], rBounds])
      } else {
        props.setZoomRange([lBounds, rBounds])
      }
    } else {
      lBounds = props.zoomRange[1]
      rBounds = props.zoomRange[1] + rangeDiff
      if (rBounds > xDomain[1]) {
        rBounds = xDomain[1]
        lBounds = xDomain[1] - rangeDiff
        props.setZoomRange([lBounds, xDomain[1]])
      } else {
        props.setZoomRange([lBounds, rBounds])
      }
    }
    
    // TODO: Is this the best way...?
    const svg = d3.select(d3Container.current)

    // clear out before we draw
    svg.selectAll("*").remove();

    // draw line map
    svg.append('path')
      .datum(sunsetJson.features[0].geometry.coordinates)
      .attr('d', line)
      .attr("stroke", "black")
      .attr("stroke-width", "6")
      .attr("fill", "none")

    svg.append("g")
      .call(brush)
      .call(brush.move, [lBounds, rBounds].map(x))
      .call(g => {
        g.select(".overlay")
          .datum({type: "selection"})
      });

    let dist = 0;
    if (direction === 'east') {
      dist = props.scrollAmount + (1 * bbox.width)
    } else {
      dist = props.scrollAmount - (1 * bbox.width);
    } 
    props.setScrollAmount(dist)
  }

  // ---------------------------------------------------------
  const renderMapControls = () => {
    return (
      <div className="map-controls">
        <div className="map-controls-inner">
          <div className="map-controls-left">
            <RoundedButton
              icon="icon-arrow-left" 
              label={'Head West'}
              handleOnClicked={() => handleScroll('west')}
            />
            <RoundedButton 
              label={`Direction: ${props.directionFacing.toUpperCase()}`}
              handleOnClicked={() => {
                if (props.directionFacing === 'n') {
                  props.setDirectionFacing('s')
                } else {
                  props.setDirectionFacing('n')
                }
              }}
            />
          </div>
          <div className="map-controls-right">
            <RoundedButton
              isActive={ props.isSearchAndFilterShowing }
              icon="icon-search-filter" 
              label={'Search & Filter'}
              handleOnClicked={() => {
                props.setIsSearchAndFilterShowing(true)
              }}
            />
            <RoundedButton
              icon="icon-arrow-right"  
              label={'Head East'}
              handleOnClicked={() => handleScroll('east')}
            />

            {/* TODO - don't put this in two places */}
            <label className="hidden" htmlFor="minimize-map">
              { props.isMapMinimized === false ? "Hide Map" : "Show Map" }
            </label>
            <button
              id='minimize-map' 
              className={`minimize-map-ctrl ${props.isMapMinimized ? 'visible' : 'hidden'}`}
              onClick={ () => props.setIsMapMinimized(!props.isMapMinimized) }
            >
              {props.isMapMinimized ? 
                <img src={iconMaximize} alt="icon-maximize"/> : 
                <img src={iconMinimize} alt="icon-minimize"/>
              }
            </button>
          </div>
        </div>
        <SearchAndFilter 
          handleCenterAddress= { props.handleCenterAddress }
          allAddresses={ props.allAddresses }
          yearsShowing={ props.yearsShowing }
          setYearsShowing={ props.setYearsShowing }
          isSearchAndFilterShowing={ props.isSearchAndFilterShowing }
          setIsSearchAndFilterShowing={ props.setIsSearchAndFilterShowing }
        />
      </div>
    )
  }

  // ---------------------------------------------------------
  return (
    <div className="map-inner">
      <div className="map" ref={mapContainer}>
        <svg
          className={`d3-component loaded-${true}`}
          ref={d3Container}
        />
      </div>
      { renderMapControls() }
    </div>
  )
}