import styled from 'styled-components';
import BackgroundImage from "../../../assets/textures/noise-gradient-footer.png";

export const Header = styled.div<{ $photoId: string | null; width: number }>`
  margin-top: 40px;
  height: 250px; //419px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  ${p => p.$photoId && ` 
    background-image: url("https://media.getty.edu/iiif/image/${p.$photoId}/full/,${p.width}/0/default.jpg");
    `}
  
  &:after {
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    background-image: url("${BackgroundImage}");
    background-size: cover;
    height: 70%;
    mix-blend-mode: multiply;
  }



`;

export const HeroAddress = styled.div`
  font-family: "Sunset-Gothic", sans-serif;
  font-size: 50px;
  line-height: 70px;
  font-weight: 400;
  margin: 0;
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 3;
  color: #fff;
`;