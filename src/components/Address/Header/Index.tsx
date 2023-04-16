import { useParams } from 'react-router-dom';
import { useAddressDataContext, useAppContext } from '../../../hooks';
import * as Styled from './styled';

const Header = () => {
  const { address } = useParams() as { address: string };
  const { width } = useAppContext();
  const { photos } = useAddressDataContext();

  return (
    <Styled.Header
      width={width}
      photoId={(photos && photos.length > 0) ? photos[Math.floor(Math.random() * photos.length)].id : null}
    >
      <Styled.HeroAddress>{address} Sunset Boulevard</Styled.HeroAddress>
    </Styled.Header>

  );
}

export default Header;