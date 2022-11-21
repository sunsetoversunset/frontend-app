import { Link } from 'react-router-dom';

const AOrLink = ({ children, ...props }: any) => {
  return (props.href.includes('http'))
    ? <a {...props}>{children}</a>
    : <Link to={props.href}>{children}</Link>
}

export default AOrLink;