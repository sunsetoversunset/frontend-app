import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Constants from "../../constants";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const Modal = styled.div`
  width: 90vw;
  height: 90vh;
  margin: 2.5vh 5vw 0vh 5vw;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  overflow-x: visible;

  @media ${Constants.devices.tablet} {
    height: 95vh;
    margin: 2.5vh 5vw;
  }
`;

export const Close = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10000;
  cursor: pointer;
  background-color: black;
  padding: 5px;
  border-radius: 5px;
`;

/* // Overrides for React IIIF Viewer */
export const Viewer = styled.div`
  .react-iiif-viewer.css-1lo3585 {
    width: 90vw !important;
    height: 90vh;
    @media ${Constants.devices.tablet} {
      height: 95vh;
    }

    /* The zoom buttons */
    .css-17zjxtl {
      top: 60px;
      right: 10px;
    }
    .css-155grvh {
      background: black;
    }
    button {
      background: black;
    }
    svg {
      fill: white;
    }
    .css-17zjxtl button:first-of-type {
      border: none !important;
    }
  }
`;

export const PreviousImage = styled.img`
  position: absolute;
  left: -2vw;
`;

export const NextImage = styled.img`
  position: absolute;
  right: -2vw;
`;

export const NearbyAddresses = styled.div<{ $isExpanded: boolean }>`
  position: absolute;
  bottom: 48px;
  left: -2vw;
  height: 56px;
  padding: ${p => (p.$isExpanded) ? '0 30px 0 0': '0'};
  background: ${Constants.colors.light1};
  border: 1px solid ${Constants.colors.black};
  border-radius: 30px;
  display: flex;
  align-items: center;
  column-gap: 12px;

  @media ${Constants.devices.tablet} {
    padding: ${p => (p.$isExpanded) ? '0 30px' : '0'};
  }
`;

export const NearbyAddressesList = styled.ul`
  display: flex;
  padding-left: 0;
  column-gap: 10px;
  list-style-type: none;
  

  @media ${Constants.devices.tablet} {
    padding-left: 10px;
    column-gap: 25px;
    margin-right: 30px;
  }
`;

export const AddressLink = styled(Link)`
  text-align: center;
  font-family: "Sunset-Gothic";
  font-weight: 300;
  color: #000000;
  position: relative;

  &:hover::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000000;
  }
  &,
  &:active,
  &:visited {
    text-decoration: none;
  }

  div:nth-child(2) {
    font-size: 0.6em;
    text-transform: uppercase;
  }
`;

export const CollapseImg = styled.img`
  display: block;
  cursor: pointer;
`;

export const Credits = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px 20px;
  font-size: 14px;

  a,
  a:active,
  a:visited {
    color: white;
    text-decoration: none;
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: white;
  }
`;