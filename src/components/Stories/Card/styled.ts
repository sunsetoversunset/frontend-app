import styled, { css } from 'styled-components';
import GradientImg from "../../../assets/textures/noise-gradient-footer.png";
import * as Constants from '../../../constants';

export const Card = styled.li<{src: string, $published: boolean}>`
  list-style: none;
  width: ${p => (p.$published) ? 'min(400px, 95vw)' : 'min(300px, 85vw)'};
  height: ${p => (p.$published) ? 300 : 225}px;
  color: white;
  background-image: url(${p => p.src});
  background-position: center center;
  background-size: cover;
  position: relative;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url(${GradientImg});
    mix-blend-mode: multiply;
  }



  ${p => (p.$published) && css`  
    &:hover {
      color: ${Constants.colors.lightOrange};
      box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
    }
  `}
`;

export const Title = styled.div`
  width: 95%;
  font-size: 1.5em;
  line-height: 20px;
  font-weight: 900;
  text-align: center;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translate(-50%);
`;

export const Author = styled.div`
  width: 95%;
  font-size: 1em;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
`;

