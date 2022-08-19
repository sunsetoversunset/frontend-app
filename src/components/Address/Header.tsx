import { useParams } from 'react-router-dom';
import { useAddressDataContext, useAppContext } from '../../hooks';
import '../../styles/AddressView.scss';

const Header = () => {
  const { address } = useParams() as { address: string };
  const { width } = useAppContext();
  const { photos } = useAddressDataContext();

  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url('https://media.getty.edu/iiif/image/${photos[Math.floor(Math.random() * photos.length)].id}/full/,${width}/0/default.jpg')`,
      }}
    >
      <p className="hero-address">{address} Sunset Boulevard</p>
    </div>

  );
}

export default Header;