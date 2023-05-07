import * as Styled from './styled';

const ImageList = ({ children }: any) => {
  if (children.every((li: any) => li.props?.children?.length === 1 && li.props?.children[0].props?.src)) {
    return <Styled.Strip>{children}</Styled.Strip>;
  }
  return <ul>{children}</ul>
}

export default ImageList;