import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, devices, deviceDimensions } from '../../constants';
const dimensions = deviceDimensions.navHeader;

export const NavLink = styled(Link)`
  border: 1px solid transparent;
  padding: 0px 12px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  color: ${colors.black};
  display: inline-block;
  font-family: "Sunset-Gothic", sans-serif;

  :hover {
    border-color: ${colors.black};
    background-color: ${colors.medOrange};
  }
`;

export const SOSImg = styled.img`
  max-height: 35px;
  max-width: calc(100% - 20px);
`;

export const NavHeader = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  text-align: center;
  background-color: ${colors.mainBg};
  border-bottom: ${dimensions.borderBottom}px solid ${colors.black};
  padding: ${dimensions.mobile.paddingTopBottom}px 0;
  height: ${dimensions.mobile.height}px;

  @media ${devices.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${dimensions.tablet.height}px;
    padding: ${dimensions.tablet.paddingTopBottom}px 30px;
  }
`;