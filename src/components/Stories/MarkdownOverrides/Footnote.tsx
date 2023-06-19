import { Link, useParams } from 'react-router-dom'

const Footnote = ({ children, ...props }: any) => {
  const { storyslug } = useParams();
  // the following detects footnotes
  if (children.length === 2 && !isNaN(children[0]) && !isNaN(props?.id)) {
    return <div id={props.id}>
      <Link to={`/stories/${storyslug}#footnote${props?.id}`}>
        {children[0]}
      </Link>
      {children.slice(1, children.length)}
    </div>
  }
  return <div>{children}</div>
}

export default Footnote;