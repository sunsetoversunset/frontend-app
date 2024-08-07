import { Link } from 'react-router-dom';

const AOrLink = ({ children, ...props }: any) => {
  return (props.href.includes('http')) 
    ? <a {...props}>{children}</a>
    : <Link
      to={props.href}
      id={(children.type === 'sup') ? `footnote${props.href.substring(1)}` : undefined}
      target={(children.type !== 'sup') ? '_blank' : undefined}
      rel={(children.type !== 'sup') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  
}

export default AOrLink;