import { useRef, useEffect, useState } from "react"
import * as d3 from 'd3'
import Config from "../config.json"
import axios from "axios"
import "../styles/PhotoStrip.scss"
import { tableFields as tf } from "../assets/data/tableFields"

export const PhotoStrip = (props) => {
  const [ bbox, setBbox ]                   = useState({});
  const stripContainer                      = useRef(null)
  const d3Container                         = useRef(null)
  const [ visiblePhotos, setVisiblePhotos ] = useState([])
  const [ photoData, setPhotoData ]         = useState([])
  const tempPhotoData = []

  const baseUrl = "https://api.baserow.io/api/database/rows/table/"
  const opts = {
    headers: {'Authorization': `Token ${Config.apiToken}`} 
  }

  // ---------------------------------------------------------------
  useEffect(() => {
    getPhotoData(`${baseUrl}${props.meta.tableId}/?filter__${props.meta.ssRow}__equal=${props.stripDirection}`)
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])


  // ---------------------------------------------------------------
  useEffect(() => {
    console.log('[PhotoStrip] props.directionFacing: ', props.directionFacing)
  }, [props.directionFacing])


  // ---------------------------------------------------------------
  const getPhotoData = (url) => {
    const queryUrl = `${url}`
    axios.get(queryUrl, opts)
      .then((res) => {
        if (res.status === 200) {
          // handle data
          res.data.results.forEach(row => {
            let processedRow = {
              "identifier": row[props.meta.idRow],
              "coordinate": row[props.meta.coordRow],
              "facing": row[props.meta.ssRow],
              "year": props.meta.year
            }
            tempPhotoData.push(processedRow)
          })
          // handle next if url exists
          if (res.data.next) {
            let nextUrl = res.data.next.replace("http", "https")
            return getPhotoData(nextUrl)
          } else {
            // finished loading data
            setPhotoData(tempPhotoData)
          }
        }
      }).catch((err) => {
        console.error('error: ', err)
        setPhotoData(tempPhotoData)
      })
  }


  // ---------------------------------------------------------------
  const set = () => {
    setBbox(stripContainer && stripContainer.current ? 
      stripContainer.current.getBoundingClientRect() : {}
    );
  }

  // ---------------------------------------------------------------
  // Whenever we select a new portion in the map (either by brush or
  // by heading east / west)
  useEffect(() => {
    const filterPhotoData = () => {    
      return photoData.filter(photoObj => {
        let photoCoord = parseFloat(photoObj.coordinate)
        return (photoCoord >= props.mappedZoomRange[0] && photoCoord <= props.mappedZoomRange[1])
      })
    }

    if (photoData && props.stripDirection === props.directionFacing) {
      setVisiblePhotos(filterPhotoData())   
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mappedZoomRange])


  // ---------------------------------------------------------------
  useEffect(() => {  
    if (photoData.length > 0 && d3Container.current) {
      renderWireframes()
      loadImages()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bbox, photoData, props.directionFacing])


  // ---------------------------------------------------------------
  useEffect(() => {
    if (visiblePhotos.length > 0) {
      // console.log(`[visiblePhotos] ${props.meta.year}: `, visiblePhotos)
      loadImages()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visiblePhotos])

  // ---------------------------------------------------------------
  const renderWireframes = () => {
    const svg = d3.select(d3Container.current)
      .attr("width", stripContainer.current.getBoundingClientRect().width)
      
    // clear out before we draw
    // svg.selectAll("*").remove();

    // bind d3 data
    const g = svg.append('g')
      .attr("class", () => { 
        return `strip-g strip-g-${props.stripDirection}` 
      });

    g.selectAll("rect")
      .data(photoData)
      .enter()
      .append("rect")
      .attr("x", (d) => { 
        if (props.stripDirection === 'n') {
          return (1 * (props.mult * parseFloat(d.coordinate))) - 184; 
        }
        return (-1 * (props.mult * parseFloat(d.coordinate))) - 184; 
      })
      .attr("y", "0")
      .attr("width", "380")
      .attr("height", "250")
      .attr("class", () => { 
        return `image-frame image-frame-${ props.stripDirection }` 
      });
  }

  // ---------------------------------------------------------------
  useEffect(() => {
    // Scroll photo strip
    d3.selectAll('.strip-g-n')
      .transition()
      .attr("transform", "translate(" + -props.scrollAmount + ",0)");

    d3.selectAll('.strip-g-s')
      .transition()
      .attr("transform", "translate(" + props.scrollAmount + ",0)");

    loadImages()
  }, [props.scrollAmount])


  // ---------------------------------------------------------------
  const loadImages = () => {  
    let m 
    let left 
    let right

    if (props.stripDirection === 'n') {
      m     = 1;
      left  = props.scrollAmount - 200;
      right = props.scrollAmount + stripContainer.current.getBoundingClientRect().width + 200;
    } else {
      m     = -1;
      right = props.scrollAmount + 200;
      left  = props.scrollAmount - stripContainer.current.getBoundingClientRect().width - 200;
    }

    // leaving as non-arrow because of 'this'
    d3.selectAll('.image-frame-' + props.stripDirection)
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
                props.handleSetModalImg({
                  id: d.identifier, 
                  year: d.year
                })
                props.handleShowModal()
              });
            d.ld = true;
          } 
        }
      });
  }

  // ---------------------------------------------------------------
  return (
    <>
      <div ref={stripContainer} className={`strip-container strip-${props.meta.year}-${props.stripDirection} ${props.isVisible ? 'visible' : 'hidden'}`}>
        <div className={`strip-photos-container year-${props.meta.year}`}>
          {
            photoData.length > 0 ? 
            <svg
              className="d3-component"
              width={400}
              height={250}
              ref={d3Container}
            /> : <span>Loading photos...</span>
          }
        </div>
      </div>
      <div className={`strip-year-label-outer-container ${props.isVisible ? 'visible' : 'hidden'}`}>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{props.meta.year}</span>
        </div>
      </div>
      <div className={`strip-divider ${props.isVisible ? 'visible' : 'hidden'} year-${props.meta.year}`}></div>
    </>
  )
}