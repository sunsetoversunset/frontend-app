import { useRef, useEffect, useState } from "react"
import * as d3 from 'd3'
import "../styles/PhotoStrip.scss"

export const PhotoStrip = (props) => {
  const [bbox, setBbox] = useState({});
  const mult            = 200
  const stripContainer  = useRef(null)
  const d3Container     = useRef(null)

  // ---------------------------------------------------------------
  const set = () => {
    setBbox(stripContainer && stripContainer.current ? 
      stripContainer.current.getBoundingClientRect() : {}
    );
  }

  useEffect(() => {
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])

  // ---------------------------------------------------------------
  useEffect(() => {
    if (props.photoData && d3Container.current) {
      renderWireframes()
      loadImages()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.photoData, props.direction, bbox])


  // ---------------------------------------------------------------
  const renderWireframes = () => {
    let data = props.direction === "n" ? props.photoData.nPhotos : props.photoData.sPhotos

    const svg = d3.select(d3Container.current)
      .attr("width", stripContainer.current.getBoundingClientRect().width)
      
    // bind d3 data
    const g = svg.append('g')
      .attr("class", () => { 
        return `strip-g strip-g-${props.direction}` 
      });

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => { 
        return (1 * (mult * parseFloat(d.coordinate))) - 184; 
      })
      .attr("y", "0")
      .attr("width", "380")
      .attr("height", "250")
      .attr("class", () => { 
        return `image-frame image-frame-${ props.direction }` 
      });
  }

  // ---------------------------------------------------------------
  const loadImages = () => {  
    let m 
    let left 
    let right

    if (props.direction === 'n') {
      m     = 1;
      left  = props.scrollAmount - 200;
      right = props.scrollAmount + stripContainer.current.getBoundingClientRect().width + 200;
    } else {
      m     = -1;
      right = props.scrollAmount + 200;
      left  = props.scrollAmount - stripContainer.current.getBoundingClientRect().width - 200;
    }

    // leaving as non-arrow because of 'this'
    d3.selectAll('.image-frame-' + props.direction)
      .each(function(d) {
        var x = d3.select(this).attr("x")
        if (m * x >= left && m * x <= right) {
          if (d.ld !== true) {
            var g = d3.select(this.parentNode);
            var f = "https://media.getty.edu/iiif/image/" + d.identifier;

            g.append("svg:image")
              .attr("x", x)
              .attr("y", "0")
              .attr("width", "380")
              .attr("height", "250")
              .attr("xlink:href", f + "/full/,250/0/default.jpg")
              .attr("class", "single-image")
              .on("click", function() {
                props.handleSetModalImg(d.identifier)
                props.handleShowModal()
              });
            d.ld = true;
          }
        };
      });
  }

  // ---------------------------------------------------------------
  return (
    <>
      <div ref={stripContainer} className={`strip-container ${props.isVisible ? '' : 'hidden'}`}>
        <div className={`strip-photos-container year-${props.year}`}>
          {
            props.photoData ? 
            <svg
              className="d3-component"
              width={400}
              height={250}
              ref={d3Container}
            /> : <span>Loading photos...</span>
          }
        </div>
      </div>
      <div className={`strip-year-label-outer-container 
        ${props.isVisible ? '' : 'hidden'}
      `}>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{props.year}</span>
        </div>
      </div>
      <div className={`strip-divider 
        ${props.isVisible ? '' : 'hidden'}
        year-${props.year}
      `}></div>
    </>
  )
}