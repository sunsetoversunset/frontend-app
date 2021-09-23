import { useRef, useEffect, useState } from "react"
import * as d3 from 'd3'
import "../styles/PhotoStrip.scss"

export const PhotoStripAddress = (props) => {
  const [isVisible, setIsVisible] = useState(true)
  const stripContainer  = useRef(null)
  const intImages  = useRef(null)
  const [addressPhotoData, setAddressPhotoData] = useState([])

  // ---------------------------------------------------------------
  useEffect(() => {
  if(props.photoData){
   props.photoData.nPhotos.forEach( row => {
     if(parseFloat(row.coordinate) < parseFloat(props.max) && parseFloat(row.coordinate) > parseFloat(props.min)){
       setAddressPhotoData(oldArray => [...oldArray, row.identifier])
     }
   })
  }
  }, [props.photoData, props.min, props.max])

  // ---------------------------------------------------------------
  useEffect(() => {
    
    if(intImages.current){
      intImages.current.addEventListener('load', e => {
        let fullImgWidth = 0;
        let imgCount = stripContainer.current.children[0].children
        Object.keys(imgCount).forEach( key => {
          fullImgWidth = fullImgWidth + imgCount[key].width
        })
        if(fullImgWidth > window.innerWidth){
          let spans = document.createElement('span')
          //right arrow box
          let rightEnd = document.createElement('div')
          rightEnd.classList.add('right-arrow')
            rightEnd.addEventListener('click', () => scrollBoy(imgCount[0].width))
          rightEnd.append( spans.cloneNode() )
          rightEnd.append( spans.cloneNode() )
          stripContainer.current.append(rightEnd)

          //left arrow box
          let leftEnd = document.createElement('div')
          leftEnd.classList.add('left-arrow')
            leftEnd.addEventListener('click', () => scrollBoy(-imgCount[0].width) )
          leftEnd.append( spans.cloneNode() )
          leftEnd.append( spans.cloneNode() )
          stripContainer.current.prepend(leftEnd)
        }
      console.log("imgwidth:"+fullImgWidth+" window: "+window.innerWidth)
      });
    }
  },[addressPhotoData, setAddressPhotoData] )

 
       const scrollBoy = (scrollOffset) => {
        stripContainer.current.children[1].scrollLeft += scrollOffset;
}

  // ---------------------------------------------------------------
  return (
    <>
      <div ref={stripContainer} className={`strip-container ${isVisible ? '' : 'hidden'}`}>
        <div className={`strip-photos-container-address year-${props.year}`}>
          {addressPhotoData.length >= 1 ? 
            addressPhotoData.map( (row, key) => (
              <img ref={intImages} onClick={() => {props.handleShowModal(); props.handleSetModalImg(row) }} 
              src={`https://media.getty.edu/iiif/image/${row}/full/,250/0/default.jpg`} key={key} />
              
            )) : <span> Now Loading </span>
          }
        </div>
      </div>
      <div className={`strip-year-label-outer-container 
        ${isVisible ? '' : 'hidden'}
      `}>
        <div className="strip-year-label-inner-container">
          <span className="strip-year-label">{props.year}</span>
        </div>
      </div>
      <div className={`strip-divider 
        ${isVisible ? '' : 'hidden'}
        year-${props.year}
      `}></div>
    </>
  )
}