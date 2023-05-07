import * as Styled from './styled';

const Callout = ({ children, ...props }: any) => {
  if (children?.type === 'code' && children?.props?.children) {
    return <Styled.Callout><p>{children?.props?.children}</p></Styled.Callout>
  }
  return <div {...props}>{children}</div>
}

export default Callout;