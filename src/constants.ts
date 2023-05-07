export const colors = {
  mainBg: '#F1EEE8',
  light1: '#FEFBF5',
  light2: '#FFF3E5',
  lightOrange: '#FFD1A6',
  medOrange: '#FF8A58',
  darkOrange: '#E95414',
  rust: '#AD3400',
  lightPurple: '#994DF6',
  purple: '#5A15AE',
  lightBlue: '#66B1EF',
  blue: '#0164B2',
  grayLightest: '#DEDEDE',
  minGrayInterface: '#919191',
  minGrayInterfaceDark: '#5C5C5C',
  black: '#000000',
  dropShadow: '#C1C1C1',
  minGrayText: '#737373',
};

export const sizes = {
  tablet: 768,
  laptop: 1024,
}

export const devices = {
  tablet: `(min-width: ${sizes.tablet}px)`,
  laptop: `(min-width: ${sizes.laptop}px)`,
}


// set variables for all the vertical dimensions for anything that's sticky or needs to be accounted for in anything that's sticky
const navHeader = {
  borderBottom: 1,
  mobile: {
    height: 63,
    paddingTopBottom: 5,
  },
  tablet: {
    height: 50,
    paddingTopBottom: 0,
  },
  laptop: {
    height: 50,
    paddingTopBottom: 0,
  },
} as const;

const panoramaControls = {
  height: 52,
  paddingTopBottom: 5,
  top: {
    mobile: navHeader.mobile.height + navHeader.mobile.paddingTopBottom * 2 + navHeader.borderBottom,
    tablet: navHeader.tablet.height + navHeader.tablet.paddingTopBottom * 2 + navHeader.borderBottom,
    laptop: navHeader.laptop.height + navHeader.laptop.paddingTopBottom * 2 + navHeader.borderBottom,
  },
} as const;

const panoramaAddressBar = {
  height: 40,
  top: {
    mobile: panoramaControls.top.mobile + panoramaControls.paddingTopBottom * 2 + panoramaControls.height,
    tablet: panoramaControls.top.tablet + panoramaControls.paddingTopBottom * 2 + panoramaControls.height,
    laptop: panoramaControls.top.laptop + panoramaControls.paddingTopBottom * 2 + panoramaControls.height,
  }
} as const;

const story = {
  top: {
    mobile: navHeader.mobile.height + navHeader.mobile.paddingTopBottom * 2 + navHeader.borderBottom,
    tablet: navHeader.tablet.height + navHeader.tablet.paddingTopBottom * 2 + navHeader.borderBottom,
    laptop: navHeader.laptop.height + navHeader.laptop.paddingTopBottom * 2 + navHeader.borderBottom,    
  }
}

export const deviceDimensions = {
  navHeader,
  panoramaControls,
  panoramaAddressBar,
  story,
} as const;