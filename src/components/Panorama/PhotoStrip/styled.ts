import styled from 'styled-components';
import * as Constants from '../../../constants';
import Noise from '../../../assets/textures/noise.png';

export const Strip = styled.div`
  max-width: 100vw;
  height: 236px;
  border-top: 0.125em solid ${Constants.colors.black};
  position: relative;
  z-index: 0;
  background-image: url(${Noise});

  &:before {
    content: '';
    position: absolute;
    background-color: ${Constants.colors.grayLightest};
    padding-bottom: 200px;
    padding-right: 100vw;
  }

  img {
    width: 293px;
    object-fit: none;
    position: absolute;
  }
`;

export const Photos = styled.div<{ width: number, translateX: number }>`
  width: ${p => p.width};
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
  border: 0.125em solid ${Constants.colors.black};
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
  overflow: visible;
  z-index: 1000;
`;

export const Divider = styled.div`

`;