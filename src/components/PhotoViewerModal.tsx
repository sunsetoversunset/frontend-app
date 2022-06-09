import { useState } from "react";
// @ts-ignore
import { Viewer } from "react-iiif-viewer";
import StripLabels from "../assets/data/strip_labels.json";
import "../styles/PhotoViewerModalNew.scss";

// import iconRightWhite from "../assets/icons/icon-right-bracket.svg"
// import iconRightRust from "../assets/icons/icon-right-bracket-rust.svg"
import iconCloseWhite from "../assets/icons/icon-close-white.svg"
// import iconLeftWhite from "../assets/icons/icon-left-bracket.svg"
// import iconLeftRust from "../assets/icons/icon-left-bracket-rust.svg"

type Props = {
  id: string;
  nextId: string | undefined;
  previousId: string | undefined;
  setModalId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PhotoViewerModal = (props: Props) => {
  const { id, nextId, previousId, setModalId } = props;
  return (
    <div className='modal-backdrop'>
      <div className="modal-header">
        <div
          onClick={() => setModalId(undefined)}
          className='modal-close-icon'
        >
          <img src={iconCloseWhite} alt="icon-close-modal" />
        </div>
      </div>
      <Viewer iiifUrl={`https://media.getty.edu/iiif/image/${id}/info.json`} />
      <div className='photo-credits'>
        Year | © Ed Ruscha.{" "}
        <a href={`https://www.getty.edu/research/collections/lookup/imageUUID?id=${id}`} rel="noreferrer" target="_blank">
          View record at Getty Research Institute</a>
      </div>
      {(previousId) && (
        <img
          id='previousImage'
          src={`https://media.getty.edu/iiif/image/${previousId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(previousId); }}
        />
      )}
      {(nextId) && (
        <img
          id='nextImage'
          src={`https://media.getty.edu/iiif/image/${nextId}/full/204,/0/default.jpg`}
          alt={id}
          onClick={() => { setModalId(nextId); }}
        />
      )}
    </div>
  );
}

export default PhotoViewerModal;