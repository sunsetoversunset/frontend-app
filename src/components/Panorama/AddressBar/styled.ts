import styled from 'styled-components';
import * as Constants from '../../../constants';
const dimensions = Constants.deviceDimensions.panoramaAddressBar;

export const AddressBar = styled.div`
  width: 300vw;
  margin-left: -100vw;
  padding-left: 100vw;
  overflow-x: visible;
  position: sticky;
  top: ${dimensions.top.mobile}px;
  height: ${dimensions.height}px;
  background-color: white;
  box-shadow: 0px 8px 8px 0px rgb(0 0 0 / 30%);
  font-weight: 600;
  align-items: center;
  z-index: 1000;
  line-height: ${dimensions.height}px;

  @media ${Constants.devices.tablet} {
    top: ${dimensions.top.tablet}px;
  }
`;

export const Address = styled.span<{ selectable: boolean }>`
  white-space: nowrap;
  position: absolute;
  text-shadow: -6px 4px 8px white, -6px -4px 8px white;
  color: ${p => (p.selectable) ? 'black' : '#999'};
  font-weight: ${p => (p.selectable) ? 'bold' : 'normal'};
  cursor: ${p => (p.selectable) ? 'pointer' : 'default'};
  text-align: center;
  width: 40px;
  overflow-x: visible;
`;
