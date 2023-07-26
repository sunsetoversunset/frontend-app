import styled from "styled-components";
import Noise from "../../../assets/textures/noise.png";

export const Panorama = styled.div<{ width: number; translateX: number }>`
  width: ${(p) => p.width}px;
  transform: translateX(${(p) => p.translateX}px);
  background-image: url(${Noise});
  overflow-x: visible;
`;

export const YearsContainer = styled.div`
  position: absolute;
  top: 40px; /* the height of the address bar */
`;
