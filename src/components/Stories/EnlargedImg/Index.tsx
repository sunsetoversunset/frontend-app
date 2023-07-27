import * as Styled from './styled';
import iconCloseWhite from "../../../assets/icons/icon-close-white.svg";

type Props = {
  src: string;
  alt: string;
  setEnlargedImg: React.Dispatch<React.SetStateAction<{
    src: string;
    alt: string;
  } | undefined>>
}

const EnlargedImg = ({ src, alt, setEnlargedImg }: Props) => {
  return (
    <Styled.EnlargedImg>
      <img src={src} alt={alt} />
      <Styled.Close onClick={() => { setEnlargedImg(undefined); }}><img src={iconCloseWhite} alt='close' /></Styled.Close>
    </Styled.EnlargedImg>

  )
}

export default EnlargedImg;