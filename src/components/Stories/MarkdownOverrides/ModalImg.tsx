import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";

const ModalImg = ({ children, ...props }: any) => {
  const captionText = props.title;
  let caption: any = '';
  if (captionText) {
    caption = (parseInt(captionText, 10) && !captionText.startsWith('[')) ? <Link to={`/address/${parseInt(captionText, 10)}`}>{captionText}</Link> : <Markdown>{captionText}</Markdown>;
  }
  let img = <img src={props.src} alt={props.alt} />;
  if (props.src.includes("media.getty.edu")) {
    const params = props.src.split("/");
    const id = params[5];
    img = (
      <img
        src={props.src}
        alt={props.alt}
        onClick={() => {
          props.setModalId(id);
          props.setModalActive(true);
        }}
        style={{
          cursor: "pointer",
        }}
      />
    );
  }
  if (caption) {
    return (
      <figure>
        {img}
        {(caption !== '') && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }
  return img;
};

export default ModalImg;
