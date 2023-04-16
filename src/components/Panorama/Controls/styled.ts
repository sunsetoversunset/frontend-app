import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, devices } from '../../../constants';

const button = css`
    
    border-radius: 50px;
    background: ${colors.light2};
    padding: 0px;
    border: 1px solid ${colors.black};
    display: flex;
    align-items: center;
    font-family: "Sunset-Gothic", sans-serif;
    font-weight: 400;
    color: ${colors.black};
    text-decoration: none;
    &:hover {
      cursor: pointer;
      background-color: ${colors.medOrange};
    }
    height: 60px;
    width: 60px;
    font-size: 12px;
    text-align: center;

    @media ${devices.tablet} {
      white-space: nowrap;
      height: 36px;
      padding: 0px 24px;
      width: auto;
      font-size: 14px;
    }
`;

export const MoveLink = styled(Link) <{ justifySelf?: string; disabled?: boolean }>`
  ${button}
  ${p => p.disabled && `
    pointer-events: none;
    color: ${colors.grayLightest};
  `}
  @media ${devices.tablet} {
    ${p => p.justifySelf && `
      justify-self: ${p.justifySelf};
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
  top: 64px;
  z-index: 1001;
  height: 70px;
  overflow: visible;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, auto);
  justify-content: space-evenly;

  @media ${devices.tablet} {
    grid-template-columns: min-content auto 200px auto min-content;
    padding: 0 20px;
    justify-items: stretch;
    justify-content: stretch;
  }
`;
