import { useParams } from 'react-router-dom';
import * as Styled from './styled';

const Callout = ({ children, ...props }: any) => {
  const { storyslug } = useParams();
  // the README file is the one exception in that it actually uses the code syntax
  if (storyslug === 'README') {
    return <Styled.Pre {...props}>{children}</Styled.Pre>
  }
  if (children?.type === 'code' && children?.props?.children) {
    return <Styled.Callout><p>{children?.props?.children}</p></Styled.Callout>
  }
  return <div {...props}>{children}</div>
}

export default Callout;