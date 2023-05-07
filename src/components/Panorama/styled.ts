import styled from "styled-components";
import * as Constants from "../../constants";

export const Panorama = styled.div`
  padding-top: ${Constants.deviceDimensions.navHeader.mobile.height}px;
  z-index: 100;

  @media ${Constants.devices.tablet} {
    padding-top: ${Constants.deviceDimensions.navHeader.tablet.height}px;
  }
`;
