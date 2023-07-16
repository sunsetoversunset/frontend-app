import styled from 'styled-components';
import GradientImg from "../../../assets/textures/noise-gradient-footer.png";
import * as Constants from '../../../constants';

export const Card = styled.li<{src: string}>`
  list-style: none;
  width: min(400px, 95vw);
  height: 300px;

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

  color: white;

  :hover {
    color: ${Constants.colors.lightOrange};
  }
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

