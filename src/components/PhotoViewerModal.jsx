import { Viewer } from "react-iiif-viewer"
import "../styles/PhotoViewerModal.scss"

export const PhotoViewerModal = (props) => {
  const baseIIIFUrl = "https://media.getty.edu/iiif/image/"
  return (
    <div 
      className={`modal-backdrop ${ props.isVisible ? "visible" : "hidden" }`}
      onClick={() => props.handleShowModal() }
    >
      <div className="photo-viewer-modal">
        { props.imgUrl !== null ?
          <Viewer iiifUrl={`${baseIIIFUrl}${props.imgUrl}/info.json`}/> : null
        }
      </div>
    </div>
  )
}