import styled from 'styled-components';
import Slider from 'rc-slider';

export const SpeedControl = styled.div`
  display: grid;
  grid-template-columns: min-content min-content min-content;
  grid-template-rows: min-content min-content;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.h6`
  grid-column: 1 / span 3;
  margin: 0 auto;
  font-weight: 300;
  text-transform: uppercase;
`;

export const SpeedSlider = styled(Slider)`
  width: 100px;
`;