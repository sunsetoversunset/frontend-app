import styled from 'styled-components';

export const StyledCallout = styled.div`
  width: 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  font-size: 44px;
  line-height: 42px;
  text-align: center;
  font-weight: 900;
  margin-bottom: 100px;
  p {
    padding: 100px 0;
    max-width: 76%;
    margin: 0 auto;
    font-family: "Stymie", san-serif;
  }
`;

// By default the markdown-to-jsx wraps a most elements in paragraph tags. 
//  This prevents that for images.
const Callout = ({ children, ...props }: any) => {
  if (children?.type === 'code' && children?.props?.children) {
    return <StyledCallout><p>{children?.props?.children}</p></StyledCallout>
  }
  return <div {...props}>{children}</div>
}

export default Callout;