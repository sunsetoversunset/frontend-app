import { useRef, useEffect, useState } from "react";
import * as d3 from 'd3'
import "../styles/Map.scss"
import sunsetJson from '../assets/data/sunset.json'

/* ---------------------------------------------------------------
  In case it's useful later - handling responsiveness:  
  https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
  --------------------------------------------------------------- */ 
export const Map = () => {
  const mapContainer          = useRef(null)
  const d3Container           = useRef(null)
  const [xDomain, setXDomain] = useState([])
  const [yDomain, setYDomain] = useState([])
  const [bbox, setBbox]       = useState({});

  const set = () => {
    setBbox(mapContainer && mapContainer.current ? mapContainer.current.getBoundingClientRect() : {});
  }
    
  // ---------------------------------------------------------------
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

  // ---------------------------------------------------------------
  useEffect(() => {
    if (sunsetJson !== null) {
      calcExtents()
    } 
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])

  // ---------------------------------------------------------------
  // Domain: lower and upper bounds of coord X data
  // Range: 0 to screen width (need to calculate width and handle resize)
  const xScale = d3.scaleLinear()
    .domain([xDomain[0], xDomain[1]])
    .range([0, bbox.width])

  // Domain: lower and upper bounds of coord Y data
  // Range: height of bounding rect to 0
  const yScale = d3.scaleLinear()
    .domain([yDomain[0], yDomain[1]])
    .range([bbox.height, 0])

  // Draws the line based on coordinate data
  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))
    .curve(d3.curveCatmullRom.alpha(1))

  // ---------------------------------------------------------------
  // Renders svg map and brush controls
  // ---------------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(d3Container.current)
      .attr("width", bbox.width)
      .attr("height", bbox.height)
      
    // clear out before we draw
    svg.selectAll("*").remove();

    // draw line map
    svg.append('path')
      .datum(sunsetJson.features[0].geometry.coordinates)
      .attr('d', line)
      .attr("stroke", "black")
      .attr("stroke-width", "6")
      .attr("fill", "none")
    
    // draw brush controls
    svg.append("g")
      .call(brush)
      // TODO: set to default coords
      // .call(brush.move, [xDomain[0], xDomain[0] + 0.0003].map(x))
      // for now, somewhere in the middle
      .call(brush.move, [-118.40142058250001, -118.37170226875].map(x))
      .call(g => {
        g.select(".overlay")
          .datum({type: "selection"})
      });
  }, [xDomain, yDomain, bbox])

  
  // ---------------------------------------------------------------
  // Brush controls
  // ---------------------------------------------------------------
  const brushed = (event) => {
    const selection = event.selection;
    if (selection === null) return
    const [x0, x1] = selection.map(x.invert);
    console.log(`x0: ${x0} x1: ${x1}`)
    // TODO: figure out how to highlight north or south part of selection?
  }

  const x = d3.scaleLinear([xDomain[0], xDomain[1]], [0, bbox.width])
  const brush = d3.brushX()
    .extent([[0, 0], [bbox.width, bbox.height]])
    .on("start brush end", brushed);

  // ---------------------------------------------------------------
  return (
    <div className="map" ref={mapContainer}>  
      <svg
        className="d3-component"
        ref={d3Container}
      />
    </div>
  )
}