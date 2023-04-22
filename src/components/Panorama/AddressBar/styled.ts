import styled from 'styled-components';
import * as Constants from '../../../constants';

export const AddressBar = styled.div`
  overflow-x: hidden;
  position: sticky;
  top: 113px;
  height: 40px;
  background-color: white;
  box-shadow: 0px 8px 8px 0px rgb(0 0 0 / 30%);
  font-weight: 600;
  align-items: center;
  z-index: 1000;
  height: 40px;
  line-height: 40px;

  @media ${Constants.devices.tablet} {
    top: 90px;
  }
`;

export const Address = styled.span<{ selectable: boolean }>`
  white-space: nowrap;
  position: absolute;
  text-shadow: -4px 2px 6px white, -4px-2px 6px white;
  color: ${p => (p.selectable) ? 'black' : '#999'};
  font-weight: ${p => (p.selectable) ? 'bold' : 'normal'};
  cursor: ${p => (p.selectable) ? 'pointer' : 'default'};
  text-align: center;
  width: 40px;
  overflow-x: visible;
`;