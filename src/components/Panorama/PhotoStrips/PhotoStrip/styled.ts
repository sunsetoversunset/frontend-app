import styled from 'styled-components';
import * as Constants from '../../../../constants';
import Noise from '../../../../assets/textures/noise.png';

export const Strip = styled.div<{ width: number }>`
  width: ${p => p.width}px;
  width: 100vw;
  overflow: visible;
  height: 236px;
  //border-top: 2px solid ${Constants.colors.black};
  margin-top: 2px;
  position: relative;
  z-index: 0;

  // styling for the border and background substantially padded on either side to accommodate drag scrolling
  &:before {
    content: '';
    position: absolute;
    width: 1100vw;
    height: 236px;
    margin-left: -500vw;
    padding-left: 500vw;
    margin-right: -500vw;
    padding-right: 500vw; 
    margin-top: -2px;
    border-top: 2px solid ${Constants.colors.black};
    background-color: ${Constants.colors.grayLightest};
    padding-bottom: 20px;
    background-image: url(${Noise});
  }

  img {
    width: 293px;
    object-fit: none;
    position: absolute;
  }
`;

export const Photos = styled.div<{ width: number, translateX: number }>`
  width: 100%;
  transform: translateX(${p => p.translateX}px);
`;

export const YearContainer = styled.div`
  height: 2px;
  background-color: ${Constants.colors.black};
  margin-bottom: -1px;
  display: flex;
  align-items: center;
`;

export const Year = styled.div`
  position: absolute;
  top: 187px;
  height: 26px;
  left: 0;
  border: 2px solid ${Constants.colors.black};
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border-left: none;
  width: 60px;
  background: ${Constants.colors.light2};
  font-family: "Sunset-Gothic", sans-serif;
  font-size: 16px;
  line-height: 26px;
  padding-left: 10px;
  font-weight: 500;
  z-index: 1000;
`;

export const YearPanorama = styled.div<{ hasPhotos: boolean }>`
  height: ${p => p.hasPhotos ? 238 : 50}px;
  position: relative;

  ${Year} {
    display: ${p => p.hasPhotos ? 'block' : 'none'};
  }
`;

export const YearsPanorama = styled.div`
  padding-top: 40px; /* the height of the address bar */
`

export const Divider = styled.div`

`;