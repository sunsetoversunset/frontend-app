const ImageList = ({ children }: any) => {
  if (children.every((li: any) => li.props?.children?.length === 1 && li.props?.children[0].props?.src)) {
    return <ul className='strip'>{children}</ul>;
  }
  return <ul>{children}</ul>
}

export default ImageList;