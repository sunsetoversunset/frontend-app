import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants';


export const Address = styled.div`
font-family: "Degular-Text", sans-serif;

  .nav-header h1 {
    font-size: 16px;
    font-weight: 500;
  }

  h1 {
    font-weight: 400;
    font-size: 22px;
    line-height: 30.8px;
    font-family: "Sunset-Gothic", sans-serif;
    margin-left: 5vw;
  }

  .header-image {
    margin-top: 40px;
    height: 250px; //419px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;

    .hero-address {
      font-family: "Sunset-Gothic", sans-serif;
      font-size: 50px;
      line-height: 70px;
      font-weight: 400;
      margin: 0;
      position: absolute;
      left: 20px;
      bottom: 20px;
      z-index: 3;
      color: #fff;
    }

    &:after {
      content: "";
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 2;
      background-image: url("../assets/textures/noise-gradient-footer.png");
      background-size: cover;
      height: 70%;
      mix-blend-mode: multiply;
    }
  }

  .container {
    padding: 40px 20px;
    border-bottom: 2px solid #000;
  }
  .container:last-of-type {
    border-bottom: 0px;
  }

  .strip-container-wrap {
    background-color: #f1eee8;

    h1 {
      margin: 50px 20px 40px 20px;
    }
    .strip-year-label-outer-container {
      margin-bottom: 37px;
    }
    .strip-container {
      border-top: 0px;

      .strip-photos-container-address {
        span {
          padding-left: 40px;
          font-size: 20px;
          line-height: 24px;
        }

        img:first-of-type {
          padding-left: 40px;
        }
      }
    }
  }

  .strip-container-wrap {
    h1 {
      font-family: "Sunset-Gothic", sans-serif;
      font-weight: 400;
      font-size: 22px;
      line-height: 30.8px;
      padding-left: 20px;
    }

    .photo-strip {
      .strip-photos-container-address {
        display: flex;
        overflow: scroll;
        scroll-behavior: smooth;
      }

      .left-arrow,
      .right-arrow {
        position: absolute;
        top: 0;
        height: 100%;
        width: 10%;
        cursor: pointer;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
      }
      .right-arrow:hover,
      .left-arrow:hover {
        opacity: 1;
        transition: all 0.3s linear;
      }
      .right-arrow {
        right: 0;
        background: linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
      }
      .left-arrow {
        left: 0;
        background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
      }
      .right-arrow span,
      .left-arrow span {
        background-color: #fff;
        width: 30px;
        height: 1px;
      }
      .right-arrow span:first-child {
        transform: rotate(-45deg);
        margin-bottom: -22px;
      }
      .right-arrow span:last-child {
        transform: rotate(45deg);
      }

      .left-arrow span:first-child {
        transform: rotate(45deg);
        margin-bottom: -22px;
      }
      .left-arrow span:last-child {
        transform: rotate(-45deg);
      }
    }
  }
  .footer {
    border-top: 0;
    mix-blend-mode: multiply;
  }

  #historicalcontext {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
  }

  #building_records,
  #zimas {
    border: 1px solid #000;
    border-radius: 16px;
    background-color: #fefbf5;
    color: black;
    min-width: 300px;
    max-width: 1000px;
    padding: 20px;

    h1 {
      font-size: 22px;
      font-weight: 400;
      line-height: 30.8px;
      margin: 14px 20px 10px;
      display: inline-block;
    }

    p {
      padding: 0 20px;
      line-height: 1.6;
    }
  }
`;

export const StoriesAlert = styled.div<{maxheight: number}>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: (100vw - 20px);
  max-height: ${p => p.maxheight}px;
  background-color: ${Constants.colors.darkOrange};
  display: grid;
  grid-template-columns: auto 30px;
  grid-column-gap: 20px;
  padding: 0 0 0 20px;
  color: ${Constants.colors.grayLightest};
  justify-items: center;
`;

export const StoriesLink = styled(Link)`
  font-size: 1.2em;
  font-weight: 700;
  color: white; 
  text-decoration: none;
  margin: auto 3px;

  &:hover {
    color: ${Constants.colors.lightBlue};
    text-decoration: underline;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  padding: 10px;
  filter: invert(100%) sepia(15%) saturate(0%) hue-rotate(104deg) brightness(103%) contrast(102%);
  
  :hover {
    filter: unset;
  }



`;
