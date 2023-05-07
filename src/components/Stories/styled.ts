import styled from "styled-components";
import * as Constants from "../../constants";
import GradientImg from "../../assets/textures/noise-gradient-footer.png";

export const Story = styled.div`
  position: relative;
  margin-top: ${Constants.deviceDimensions.story.top.mobile}px;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  font-family: "Degular-Text", sans-serif;
  overflow: hidden;

  article > p:first-child {
    font-size: 24px;
    line-height: 32px;
    font-family: "Sunset-Gothic", sans-serif;
  }

  h3,
  p {
    max-width: min(95%, 800px);
    margin-left: auto;
    margin-right: auto;
  }

  a {
    color: ${Constants.colors.darkOrange};
  }

  figure {
    margin: 0;
  }

  figcaption {
    font-family: "Sunset-Gothic", sans-serif;
    font-size: 13px;
    line-height: 26px;
    margin: 0;
    box-sizing: border-box;
    padding: 4px 30px;
    white-space: nowrap;
    // set the width to 1px from keeping the figcaption from growing the li in which it's contained.
    width: 1px;

    a {
      color: ${Constants.colors.black};
      text-decoration: none;

      &:hover {
        color: ${Constants.colors.darkOrange};
        text-decoration: underline;
      }
    }
  }

  @media ${Constants.devices.tablet} {
    margin-top: ${Constants.deviceDimensions.story.top.tablet}px;
  }
`;

export const HeaderImage = styled.div<{ url: string }>`
  height: calc(75vh - 40px);
  width: 100%;
  margin-top: 0;
  margin-bottom: 70px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  background-image: url(${(p) => p.url});

  &:before {
    content: "";
    width: 100%;
    height: calc(75vh - 40px);
    position: absolute;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url(${GradientImg});
    mix-blend-mode: multiply;

    @media ${Constants.devices.tablet} {
      height: calc(44vw - 40px);
    }
  }
`;

export const Title = styled.div`
  width: 95vw;
  font-size: 3rem;
  line-height: 66px;
  font-weight: 900;
  text-align: center;
  color: white;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);

  @media ${Constants.devices.tablet} {
    width: 67vw;
  }
`;

export const Byline = styled.div`
  max-width: min(95%, 800px);
  margin-left: auto;
  margin-right: auto;
`;

export const SectionTitle = styled.h3`
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  font-family: "Stymie", san-serif;
`;