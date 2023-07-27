import styled, { css } from 'styled-components';
import { Link as RRDLink } from 'react-router-dom';
import * as Constants from '../../../constants';

const centering = css`
  width: min(90vw, 500px);
  margin: 10px auto;
`;

export const PageHeader = styled.div`
  height: calc(95vh - 200px);
  width: 100%;
  margin-top: 40px;
  margin-bottom: 70px;
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  position: relative;
`;

export const Title = styled.div`
    position: relative;
    height: calc(95vh - 200px);
    width: 100%;
    span {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      font-size: 50px;
      line-height: 1.05;
      -moz-font-feature-settings: "titl";
      -ms-font-feature-settings: "titl" 1;
      -webkit-font-feature-settings: "titl" 1;
      -o-font-feature-settings: "titl" 1;
      font-feature-settings: "titl" 1;

      @media ${Constants.devices.tablet} {
        font-size: 84px;
      }
    }
    .top {
      font-family: "Superette Face", cursive;
      color: #ffd1a6;
    }
    .bottom {
      font-family: "Superette", cursive;
      color: #000;
    }


`;

export const Subtitle = styled.h2`
  font-family: "Sunset-Gothic", sans-serif;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  ${centering}

  @media ${Constants.devices.tablet} {
    font-size: 30px;
    line-height: 38px;
  }
`;

export const About = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  font-family: "Degular-Text", sans-serif;

  p {
    ${centering};
  }
`;

export const Callout = styled.div`
  width: 100% !important;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  font-size: 30px;
  line-height: 27px;
  text-align: center;
  font-weight: 900;
  padding: 25px 0;

  margin: 0 auto;
  font-family: "Stymie", san-serif;

  @media ${Constants.devices.tablet} {
    padding: 100px 75px;
    width: calc(100% - 150px) !important;
    font-size: 44px;
    line-height: 42px;
    padding: 100px 0;

  }
`;

export const Heading = styled.h2`
  font-family: "Sunset-Gothic", sans-serif;
  font-size: 30px;
  line-height: 38px;
  font-weight: 400;
  
  ${centering};
  margin-top: 40px;
`;

export const Subheading = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  ${centering};
  margin-top: 30px;
`;

export const TeamList = styled.ul`
  list-style: none;
  ${centering};
  padding: 0;

  li {
    margin: 10px 0;

    img {
      max-width: 95vw;
    }
  }
`;

export const Link = styled(RRDLink)`
  font-weight: 600;
`;

export const Figure = styled.figure`
  margin: 18px 0;
  img {
    display: block;
    margin: 10px auto;
  }

  figcaption {
    width: min(80vw, 800px);
    margin: 10px auto;
    font-style: italic;
    color: ${Constants.colors.minGrayText};
  }
`;

export const MapFigure = styled(Figure)`
  img {
    ${centering};
  }
  
  figcaption {
    text-align: center;
  }
`;

export const Close = styled.div`
  grid-area: close;
  align-self: start;
  margin-top: 20px;
`;

export const EnlargedMap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.9);
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 100vh;
  grid-template-areas: ". img close";
  justify-items: center;
  align-items: center;

  img {
    grid-area: img;
    max-height: 96vh;
    max-width: 100%;
  }
`;


