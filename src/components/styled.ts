import styled, { createGlobalStyle } from "styled-components";
import * as Constants from "../constants";
import DegularThin2 from '../assets/fonts/Degular/Web/Degular-Thin.woff2';
import DegularThin from '../assets/fonts/Degular/Web/Degular-Thin.woff';
import DegularThinItalic2 from '../assets/fonts/Degular/Web/Degular-Thin_Italic.woff2';
import DegularThinItalic from '../assets/fonts/Degular/Web/Degular-Thin_Italic.woff';
import DegularLight2 from '../assets/fonts/Degular/Web/Degular-Light.woff2';
import DegularLight from '../assets/fonts/Degular/Web/Degular-Light.woff';
import DegularLightItalic2 from '../assets/fonts/Degular/Web/Degular-Light_Italic.woff2';
import DegularLightItalic from '../assets/fonts/Degular/Web/Degular-Light_Italic.woff';
import DegularRegular2 from '../assets/fonts/Degular/Web/Degular-Regular.woff2';
import DegularRegular from '../assets/fonts/Degular/Web/Degular-Regular.woff';
import DegularItalic2 from '../assets/fonts/Degular/Web/Degular-Italic.woff2';
import DegularItalic from '../assets/fonts/Degular/Web/Degular-Italic.woff';
import DegularMedium2 from '../assets/fonts/Degular/Web/Degular-Medium.woff2';
import DegularMedium from '../assets/fonts/Degular/Web/Degular-Medium.woff';
import DegularMediumItalic2 from '../assets/fonts/Degular/Web/Degular-Medium_Italic.woff2';
import DegularMediumItalic from '../assets/fonts/Degular/Web/Degular-Medium_Italic.woff';
import DegularSemibold2 from '../assets/fonts/Degular/Web/Degular-Semibold.woff2';
import DegularSemibold from '../assets/fonts/Degular/Web/Degular-Semibold.woff';
import DegularSemiboldItalic2 from '../assets/fonts/Degular/Web/Degular-Semibold_Italic.woff2';
import DegularSemiboldItalic from '../assets/fonts/Degular/Web/Degular-Semibold_Italic.woff';
import DegularBold2 from '../assets/fonts/Degular/Web/Degular-Bold.woff2';
import DegularBold from '../assets/fonts/Degular/Web/Degular-Bold.woff';
import DegularBoldItalic2 from '../assets/fonts/Degular/Web/Degular-Bold_Italic.woff2';
import DegularBoldItalic from '../assets/fonts/Degular/Web/Degular-Bold_Italic.woff';
import DegularBlack2 from '../assets/fonts/Degular/Web/Degular-Black.woff2';
import DegularBlack from '../assets/fonts/Degular/Web/Degular-Black.woff';
import DegularBlackItalic2 from '../assets/fonts/Degular/Web/Degular-Black_Italic.woff2';
import DegularBlackItalic from '../assets/fonts/Degular/Web/Degular-Black_Italic.woff';
import DegularTextThin2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Thin.woff2';
import DegularTextThin from '../assets/fonts/Degular_Text/Web/Degular_Text-Thin.woff';
import DegularTextThinItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Thin_Italic.woff2';
import DegularTextThinItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Thin_Italic.woff';
import DegularTextLight2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Light.woff2';
import DegularTextLight from '../assets/fonts/Degular_Text/Web/Degular_Text-Light.woff';
import DegularTextLightItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Light_Italic.woff2';
import DegularTextLightItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Light_Italic.woff';
import DegularTextRegular2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Regular.woff2';
import DegularTextRegular from '../assets/fonts/Degular_Text/Web/Degular_Text-Regular.woff';
import DegularTextItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Italic.woff2';
import DegularTextItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Italic.woff';
import DegularTextMedium2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Medium.woff2';
import DegularTextMedium from '../assets/fonts/Degular_Text/Web/Degular_Text-Medium.woff';
import DegularTextMediumItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Medium_Italic.woff2';
import DegularTextMediumItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Medium_Italic.woff';
import DegularTextSemibold2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Semibold.woff2';
import DegularTextSemibold from '../assets/fonts/Degular_Text/Web/Degular_Text-Semibold.woff';
import DegularTextSemiboldItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Semibold_Italic.woff2';
import DegularTextSemiboldItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Semibold_Italic.woff';
import DegularTextBold2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Bold.woff2';
import DegularTextBold from '../assets/fonts/Degular_Text/Web/Degular_Text-Bold.woff';
import DegularTextBoldItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Bold_Italic.woff2';
import DegularTextBoldItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Bold_Italic.woff';
import DegularTextBlack2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Black.woff2';
import DegularTextBlack from '../assets/fonts/Degular_Text/Web/Degular_Text-Black.woff';
import DegularTextBlackItalic2 from '../assets/fonts/Degular_Text/Web/Degular_Text-Black_Italic.woff2';
import DegularTextBlackItalic from '../assets/fonts/Degular_Text/Web/Degular_Text-Black_Italic.woff';
import SunsetGothicLight2 from '../assets/fonts/Sunset_Gothic/sunset-gothic-light-pro-web/web/sunset-gothic-light-pro.woff2';
import SunsetGothicLight from '../assets/fonts/Sunset_Gothic/sunset-gothic-light-pro-web/web/sunset-gothic-light-pro.woff';
import SunsetGothicMedium2 from '../assets/fonts/Sunset_Gothic/sunset-gothic-regular-pro-web/web/sunset-gothic-regular-pro.woff2';
import SunsetGothicMedium from '../assets/fonts/Sunset_Gothic/sunset-gothic-regular-pro-web/web/sunset-gothic-regular-pro.woff';
import SunsetGothicPro2 from '../assets/fonts/Sunset_Gothic/sunset-gothic-medium-pro-web/web/sunset-gothic-medium-pro.woff2';
import SunsetGothicPro from '../assets/fonts/Sunset_Gothic/sunset-gothic-medium-pro-web/web/sunset-gothic-medium-pro.woff'
import Stymie2 from '../assets/fonts/Stymie/Stymie_Extra_Bold.woff2';
import Stymie from '../assets/fonts/Stymie/Stymie_Extra_Bold.woff';
import SuperetteShadedFace2 from '../assets/fonts/Superette/Superette-Shaded-Face-Web.woff2';
import SuperetteShadedFace from '../assets/fonts/Superette/Superette-Shaded-Face-Web.woff';
import SuperetteShadedWeb2 from '../assets/fonts/Superette/Superette-Shaded-Web.woff2';
import SuperetteShadedWeb from '../assets/fonts/Superette/Superette-Shaded-Web.woff';

export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    background-color: ${Constants.colors.mainBg};
    font-family: "Degular", sans-serif;
  }
`;

export const FontStyles = createGlobalStyle`
// Degular-Thin
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularThin2}) format('woff2'),
    url(${DegularThin}) format('woff');
  font-weight: 100;
}

// Degular-Thin_Italic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularThinItalic2}) format('woff2'),
    url(${DegularThinItalic}) format('woff');
  font-weight: 100;
  font-style: italic;
}

// Degular-Light
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularLight2}) format('woff2'),
    url(${DegularLight}) format('woff');
  font-weight: 300;
}

// Degular-Light_Italic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularLightItalic2}) format('woff2'),
    url(${DegularLightItalic}) format('woff');
  font-weight: 300;
  font-style: italic;
}

// Degular-Regular
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularRegular2}) format('woff2'),
    url(${DegularRegular}) format('woff');
  font-weight: 400;
}

// Degular-Italic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularItalic2}) format('woff2'),
    url(${DegularItalic}) format('woff');
  font-weight: 400;
  font-style: italic;
}

// Degular-Medium
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularMedium2}) format('woff2'),
    url(${DegularMedium}) format('woff');
  font-weight: 500;
}

// Degular-MediumItalic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularMediumItalic2}) format('woff2'),
    url(${DegularMediumItalic}) format('woff');
  font-weight: 500;
  font-style: italic;
}

// Degular-Semibold
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularSemibold2}) format('woff2'),
    url(${DegularSemibold}) format('woff');
  font-weight: 600;
}

// Degular-SemiboldItalic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularSemiboldItalic2}) format('woff2'),
    url(${DegularSemiboldItalic}) format('woff');
  font-weight: 600;
  font-style: italic;
}

// Degular-Bold 
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularBold2}) format('woff2'),
    url(${DegularBold}) format('woff');
  font-weight: 700;
}

// Degular-BoldItalic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularBoldItalic2}) format('woff2'),
    url(${DegularBoldItalic}) format('woff');
  font-weight: 700;
  font-style: italic;
}

// Degular-Black
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularBlack2}) format('woff2'),
    url(${DegularBlack}) format('woff');
  font-weight: 800
}

// Degular-BlackItalic
@font-face {
  font-family: 'Degular';
  src: 
    url(${DegularBlackItalic2}) format('woff2'),
    url(${DegularBlackItalic}) format('woff');
  font-weight: 800;
  font-style: italic;
}

// ----------------------------
// Degular Text
// ----------------------------

// Degular-Thin
@font-face {
  font-family: 'Degular-Text';
  src:
    url(${DegularTextThin2}) format('woff2'),
    url(${DegularTextThin}) format('woff');
  font-weight: 100;
}

// Degular-Thin_Italic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextThinItalic2}) format('woff2'),
    url(${DegularTextThinItalic}) format('woff');
  font-weight: 100;
  font-style: italic;
}

// Degular-Light
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextLight2}) format('woff2'),
    url(${DegularTextLight}) format('woff');
  font-weight: 300;
}

// Degular-Light_Italic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextLightItalic2}) format('woff2'),
    url(${DegularTextLightItalic}) format('woff');
  font-weight: 300;
  font-style: italic;
}

// Degular-Regular
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextRegular2}) format('woff2'),
    url(${DegularTextRegular}) format('woff');
  font-weight: 400;
}

// Degular-Italic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextItalic2}) format('woff2'),
    url(${DegularTextItalic}) format('woff');
  font-weight: 400;
  font-style: italic;
}

// Degular-Medium
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextMedium2}) format('woff2'),
    url(${DegularTextMedium}) format('woff');
  font-weight: 500;
}

// Degular-MediumItalic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextMediumItalic2}) format('woff2'),
    url(${DegularTextMediumItalic}) format('woff');
  font-weight: 500;
  font-style: italic;
}

// Degular-Semibold
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextSemibold2}) format('woff2'),
    url(${DegularTextSemibold}) format('woff');
  font-weight: 600;
}

// Degular-SemiboldItalic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextSemiboldItalic2}) format('woff2'),
    url(${DegularTextSemiboldItalic}) format('woff');
  font-weight: 600;
  font-style: italic;
}

// Degular-Bold 
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextBold2}) format('woff2'),
    url(${DegularTextBold}) format('woff');
  font-weight: 700;
}

// Degular-BoldItalic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextBoldItalic2}) format('woff2'),
    url(${DegularTextBoldItalic}) format('woff');
  font-weight: 700;
  font-style: italic;
}

// Degular-Black
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextBlack2}) format('woff2'),
    url(${DegularTextBlack}) format('woff');
  font-weight: 800
}

// Degular-BlackItalic
@font-face {
  font-family: 'Degular-Text';
  src: 
    url(${DegularTextBlackItalic2}) format('woff2'),
    url(${DegularTextBlackItalic}) format('woff');
  font-weight: 800;
  font-style: italic;
}
// ----------------------------
// Sunset Gothic
// ----------------------------

// Light
@font-face {
  font-family: 'Sunset-Gothic';
  src: 
    url(${SunsetGothicLight2}) format('woff2'),
    url(${SunsetGothicLight}) format('woff');
  font-weight: 300;
}

// Regular
@font-face {
  font-family: 'Sunset-Gothic';
  src: 
    url(${SunsetGothicMedium2}) format('woff2'),
    url(${SunsetGothicMedium}) format('woff');
  font-weight: 400;
}

// Medium
@font-face {
  font-family: 'Sunset-Gothic';
  src: 
    url(${SunsetGothicPro2}) format('woff2'),
    url(${SunsetGothicPro}) format('woff');
  font-weight: 500;
}

// ----------------------------
// Stymie
// ----------------------------
// Bold
@font-face {
  font-family: 'Stymie';
  src: 
    url(${Stymie2}) format('woff2'),
    url(${Stymie}) format('woff');
  font-weight: 800;
}

// ----------------------------
// Superette
// ----------------------------
// Face
@font-face {
  font-family: 'Superette Face';
  src: 
    url(${SuperetteShadedFace2}) format('woff2'),
    url(${SuperetteShadedFace}) format('woff');
}
// Normal
@font-face {
  font-family: 'Superette';
  src: 
    url(${SuperetteShadedWeb2}) format('woff2'),
    url(${SuperetteShadedWeb}) format('woff');
}
`;

export const App = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
`;
