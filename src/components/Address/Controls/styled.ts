import styled from 'styled-components';
import{ button, MapControls } from '../../Panorama/Controls/styled';
import * as Constants from '../../../constants';

export const Nav = styled(MapControls)`
  grid-template-columns: min-content min-content min-content min-content;
  
  @media ${Constants.devices.tablet} {
    grid-template-columns: min-content auto auto min-content;
  }
`;

export const ToggleButton = styled.button <{children: React.ReactNode;}>`
  ${button};
  width: auto;
`;
