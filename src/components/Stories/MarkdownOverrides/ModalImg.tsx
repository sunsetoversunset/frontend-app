import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import AOrLink from "./Link";

const ModalImg = ({ children, ...props }: any) => {
  const captionText = props.title;
  let caption: any = '';
  if (captionText) {
    caption = (parseInt(captionText, 10) && !captionText.startsWith('[')) ? <Link to={`/address/${parseInt(captionText, 10)}`}>{captionText}</Link> : <Markdown options={{ overrides: {a: {component: AOrLink }}}}>{captionText}</Markdown>;
  }
  let img = <img
    src={props.src}
    alt={props.alt}
    onClick={() => {
      props.setEnlargedImg({
        src: props.src,
        alt: props.alt,
      })
    }}
    style={{
      cursor: "pointer",
    }}
  />;
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
  if (caption !== '') {
    return (
      <figure>
        {img}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }
  return img;
};

export default ModalImg;
