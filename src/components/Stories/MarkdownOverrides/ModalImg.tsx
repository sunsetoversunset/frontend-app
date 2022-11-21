const ModalImg = ({ children, ...props }: any) => {
  if (props.src.includes('media.getty.edu')) {
    const params = props.src.split('/');
    const id = params[5];
    return (
      <img
        src={props.src}
        alt={props.alt}
        onClick={() => {
          props.setModalId(id);
          props.setModalActive(true);
        }}
      />
    )
  }
  return (
    <img
      src={props.src}
      alt={props.alt}
    />
  )
}

export default ModalImg;