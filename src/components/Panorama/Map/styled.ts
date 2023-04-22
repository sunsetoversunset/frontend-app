import styled from 'styled-components';
import * as Constants from '../../../constants';

export const Map = styled.div <{ height: number; }>`
  width: 100%;
  height: ${p => p.height * 1.25};
  background-color: ${Constants.colors.mainBg};
`;

export const MapLabel = styled.text`
  font-weight: 400;
  fill: grey;
  text-anchor: middle;
  font-size: min(14px, max(1.5vw, 8px));
`

export const Text = styled.text`
  font-weight: 400;
  fill: #999999;
  font-style: italic;
  text-anchor: middle;
  font-size: 2vw;

  tspan {
    font-size: 10px;
  }
`;

export const TickLabel = styled(Text)`
  font-size: 10px;
  font-style: normal;
`;