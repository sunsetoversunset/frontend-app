import styled from 'styled-components';
import * as Constants from "../../../../constants";

export const SingleImgDiv = styled.div`
    width: 95%;
    margin: 0 auto 60px auto;

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
    img {
      max-width: 100%;
    }

    @media ${Constants.devices.tablet} {
       width: 62.5%;
    }
`;