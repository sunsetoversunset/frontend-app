import { Callout } from '../Story';

// By default the markdown-to-jsx wraps a most elements in paragraph tags. 
//  This prevents that for images.
const ToPOrNotToP = ({ children, ...props }: any) => {
  console.log(children[0]);
  if (children[0]?.type === 'code' && children[0]?.props?.children) {
    return <Callout><p>{children[0]?.props?.children}</p></Callout>
  }
  // if the first and only child has a src prop, it's an image
  if (children[0]?.props?.src && children.length === 1) {
    return <div className="single-image">{children}</div>;
  }
  const ParaComponent = (children[0]?.props?.src === 'ModalImg' || children[0]?.type?.name === 'img' || children[0]?.type?.name === 'code') ? 'div' : 'p'
  return <ParaComponent {...props}>{children}</ParaComponent>
}

export default ToPOrNotToP;