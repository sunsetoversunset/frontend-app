import styled from 'styled-components';
import * as Constants from '../../constants';
import TexturedBackground from '../../assets/textures/noise-gradient-footer.png';

export const Footer = styled.footer`
  text-align: center;
  width: 100%;
  border-top: 1px solid ${Constants.colors.black};
`;

export const Graphic = styled.div`
  background-image: url('${TexturedBackground}');
  background-size: cover;
`;

export const SunsetOverSunsetIcon = styled.img`
  max-width: 90%;
  margin: 2rem 0;
  mix-blend-mode: multiply;
`;

export const Credit = styled.div`
  background-color: ${Constants.colors.black};
  color: ${Constants.colors.mainBg};
  font-size: 12px;
  padding: 0.25rem 0;
`;