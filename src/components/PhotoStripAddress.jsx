import { useRef, useEffect, useState } from "react"
import "../styles/PhotoStrip.scss"

export const PhotoStripAddress = (props) => {
  const [isVisible] = useState(true)
  const [isLoading, setIsLoading] = useState('Loading photos...')
  const stripContainer  = useRef(null)
  const intImages  = useRef(null)
  const [filteredPhotoData, setFilteredPhotoData] = useState([])


  // ---------------------------------------------------------------
  useEffect(() => {
    if(props.photoData){
      props.photoData.forEach( el => {
        if(el.year === props.year){
          setFilteredPhotoData(oldArray => [...oldArray, el.photoID])
        }else{
          setIsLoading("No images for this year")
        }
      })
    }

  }, [props.photoData, props.year, props.min, props.max])

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
      });
    }
  },[filteredPhotoData, setFilteredPhotoData] )

 
       const scrollBoy = (scrollOffset) => {
        stripContainer.current.children[1].scrollLeft += scrollOffset;
}

  // ---------------------------------------------------------------
  return (
    <>
      <div ref={stripContainer} className={`strip-container ${isVisible ? '' : 'hidden'}`}>
        <div className={`strip-photos-container-address year-${props.year}`}>
          {filteredPhotoData.length >= 1 ? 
            filteredPhotoData.map( (row, key) => (
              <img alt='' ref={intImages} onClick={() => {props.handleShowModal(); props.handleSetModalImg({id:row,year:props.year}); }} 
              src={`https://media.getty.edu/iiif/image/${row}/full/,250/0/default.jpg`} key={key} />
              
            )) : <span> {isLoading} </span>
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
    </>
  )
}