import styled from 'styled-components';
import { Link } from 'react-router-dom';
import{ button, MapControls } from '../../Panorama/Controls/styled';
import * as Constants from '../../../constants';

export const Nav = styled(MapControls)`
  @media ${Constants.devices.tablet} {
    grid-template-columns: min-content min-content min-content min-content;
  }
`;

export const LinkRight = styled(Link)`
  justify-self: end;
`;

export const ToggleButton = styled.button`
  ${button};
  width: auto;
`;