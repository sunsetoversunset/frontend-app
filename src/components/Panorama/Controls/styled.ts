import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, devices, deviceDimensions } from '../../../constants';
const dimensions = deviceDimensions.panoramaControls;

export const button = css`
    border-radius: 20px;
    background: ${colors.light2};
    padding: 0 5px;
    border: 1px solid ${colors.black} !important;
    display: flex;
    align-items: center;
    font-family: "Sunset-Gothic", sans-serif;
    font-weight: 400;
    color: ${colors.black};
    text-decoration: none;
    height: 40px;
    width: 70px;
    font-size: 12px;
    text-align: center;

    &:hover {
      cursor: pointer;
      background-color: ${colors.medOrange};
    }

    img {
      max-width: 12px;
      padding: 0 3px;
    }

    @media ${devices.tablet} {
      white-space: nowrap;
      height: 36px;
      padding: 0px 20px;
      width: auto;
      font-size: 14px;
      border-radius: 18px;
    }
`;

export const MoveLink = styled(Link) <{ justifyself?: string; disabled?: boolean }>`
  ${button}
  ${p => p.disabled && `
    pointer-events: none;
    color: ${colors.grayLightest};
  `}
  @media ${devices.tablet} {
    ${p => p.justifyself && `
      justify-self: ${p.justifyself};
    `}
  }
`;

export const SearchAndFilterButton = styled.button`
  ${button};
  img {
    display: none;
  }

  @media ${devices.tablet} {
    img {
      display: inline-block;
    }
  }
`;

export const MapControls = styled.div`
  position: sticky;
  top: ${dimensions.top.mobile}px;
  z-index: 1001;
  overflow: visible;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, auto);
  justify-content: space-evenly;
  background-color: ${colors.mainBg};
  height: ${dimensions.height}px;
  padding: ${dimensions.paddingTopBottom}px 0;

  @media ${devices.tablet} {
    top: ${dimensions.top.tablet}px;
    grid-template-columns: min-content auto 200px auto min-content;
    padding-left: 20px;
    padding-right: 20px;
    justify-items: stretch;
    justify-content: stretch;
  }
`;
