
import { Point, Direction, StripLabel, Year, YearStr, YearValues } from './index.d';
import stripLabels from './assets/data/strip_labels.json';
import AddressesWithBoundaries from './assets/data/addresses_with_boundaries.json';

/*
  coordinates mapped to north addresses
     coordinates      0 [------------------------------------------------]   1,000
          n 'x's      0 [------------------------------------------------] 200,000
       addresses   9201 [------------------------------------------------] 307
          (coord: 0.76, x: 152)                             (coord: 961.82065, x: 192364.13)


  coordinates mapped to south addresses
    coordinates   1,000 [------------------------------------------------] 0
         s 'x's 200,000 [------------------------------------------------] 0
      addresses    9176 [------------------------------------------------] 846 
        (coord:0.89550, x: 179.1)                            

  north addresses mapped to south addresses
           n xs       0 [------------------------------------------------] 200,000
           s xs 200,000 [------------------------------------------------]   1,000 
*/


/**
 * CONSTANTS
 */

/**
 * The multiplier used for the placement of the photos on the strip for the panorama view
 */
export const mult = 200;

/**
 * The maximum coordinate
 * @remarks
 * The photos and addresses are placed assigned a coordinate value between 0 and 
 * 1000 for the extent of the photos, not the addresses
 */
export const maxCoordinate = 1000;

/**
 * The maximum x value for photos
 */
export const maxX = maxCoordinate * mult;

/**
 * The display width of each photo
 */
export const photoWidth = 294;

/**
 * The display height of each photo
 */
export const photoHeight = 200;

/**
 * Half the width of the photo not as the x but as a coordiante
 */
export const halfPhotoCoordinate = photoWidth / 2 / mult;

/**
 * The five years of photos as strings
 */
export const yearsStrings: YearStr[] = ["1966", "1973", "1985", "1995", "2007"];

/**
 * The five years of photos as number
 */
export const years: Year[] = [1966, 1973, 1985, 1995, 2007];

/**
 * The max coordinate of the last photo for each year
 * @remarks
 * These are just copied out of the baserow data--they shouldn't change, and there's no reason to load the photos data files asyncronously just to get them.
 */
const maxCoordinates: YearValues<number> = {
  '1966': 163.47121,
  '1973': 977.54089,
  '1985': 979.36723,
  '1995': 984.23148,
  '2007': 993.27018,
};

/**
 * The max x values of the last photo for each year
 */
export const maxXs: YearValues<number> = {
  '1966': maxCoordinates['1966'] * mult,
  '1973': maxCoordinates['1973'] * mult,
  '1985': maxCoordinates['1985'] * mult,
  '1995': maxCoordinates['1995'] * mult,
  '2007': maxCoordinates['2007'] * mult,
};

/**
 * The labels with the calculated x and percent along path
 */
export const labels: StripLabel[] = stripLabels
  // remove duplicates
  .filter((d, i, arr) => i === arr.findIndex(_d => _d.l === d.l && _d.s === d.s))
  // remove three incorrect labels
  // todo: fix these in the data
  .filter(d => d.l !== 1332 && d.l !== 9201 && d.l !== 'Doheny Road' && d.l !== 'Cory Avenue')
  .map(d => ({
    label: d.l.toString(),
    direction: d.s as Direction,
    x: getCoordinateToX(d.c, d.s as Direction),
    coordinate: d.c,
    lat: d.lat,
    lng: d.lng,
    percentAlongPath: d.c * mult / maxX,
    rotation: d.r,
  }))
  .sort((a, b) => a.x - b.x);

/**
 * The eastermost longitudes for each year
 * @remarks
 * Used on the map to only show the extent of selected years
 */
export const easternLongitudes: YearValues<number> = {
  '1966': getLabelFromAddress(ensure(getProximateAddressFromX('closest', maxXs['1966'], 'n')).addr).lng,
  '1973': getLabelFromAddress(ensure(getProximateAddressFromX('closest', maxXs['1973'], 'n')).addr).lng,
  '1985': getLabelFromAddress(ensure(getProximateAddressFromX('closest', maxXs['1985'], 'n')).addr).lng,
  '1995': getLabelFromAddress(ensure(getProximateAddressFromX('closest', maxXs['1995'], 'n')).addr).lng,
  '2007': getLabelFromAddress(ensure(getProximateAddressFromX('closest', maxXs['2007'], 'n')).addr).lng,
}

/**
 * The minimum, maximum, and mid latitudes and longituddes of any address
 */
const latLngValues = {
  minLat: Math.min(...stripLabels.map(d => d.lat)),
  maxLat: Math.max(...stripLabels.map(d => d.lat)),
  midLat: Math.max(...stripLabels.map(d => d.lat)) - ((Math.max(...stripLabels.map(d => d.lat)) - Math.min(...stripLabels.map(d => d.lat))) / 2),
  minLng: Math.min(...stripLabels.map(d => d.lng)),
  maxLng: Math.max(...stripLabels.map(d => d.lng)),
  midLng: Math.max(...stripLabels.map(d => d.lng)) - ((Math.max(...stripLabels.map(d => d.lng)) - Math.min(...stripLabels.map(d => d.lng))) / 2),
}

/**
 * colors for the site
 */
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
  minGrayInterfacedark: '#5C5C5C',
  black: '#000000',
  dropShadow: '#C1C1C1',
  minGrayText: '#737373',
};

/**
 * FUNCTIONS USED ONLY BY UTILITIES
 */

/**
* Convert a coordinate to the x value depending on whether the diretion is n or south
* @param coordinate - The coordinate
* @param direction - The direction for the x value; is it on the north or the south side?
* @returns The corresponding x value
*/
// 
function getCoordinateToX(coordinate: number, direction: Direction) {
  return (direction === 'n') ? coordinate * mult : maxX - coordinate * mult;
}

/**
 * Convert an x to the coordinate value depending on whether the diretion is n or south
 * @param x - The x value
 * @param direction - The direction for the x value; is it on the north or the south side?
 * @returns The corresponding coordinate value
 */
function getXToCoordinate(x: number, direction: Direction) {
  return (direction === 'n') ? x / mult : Math.max(...Object.values(maxCoordinates)) - x / mult;
}

/**
 * A utility function used as an alternative to type assertion when I know a find function of the like will return a value
 * @remarks
 * from https://stackoverflow.com/questions/54738221/typescript-array-find-possibly-undefind
 * @param argument 
 * @param message 
 * @returns the argument
 */
function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}

/**
 * FUNCTIONS USED IN COMPONENTS ETC
 */

/**
 * Given an x, finds the closest address and offset to the left (previous), right (next), or either (closest).
 * @param orientation Whether to get the previous address (left), the next (right) or closest
 * @param x The x positoin along the photo strip
 * @param direction The direction
 * @param [options.direction] - A option to include only one side og the street
 * @param [options.excludeCrossStreets] - An option to exlude cross-streets
 * @param [option.useCoordinateNotX] Treat the x as a coordinate not the x distance on a photo strip
 * @returns The address, offset, and x value
 */
export function getProximateAddressFromX(orientation: 'previous' | 'next' | 'closest', x: number, direction: Direction, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean; useCoordinateNotX?: boolean; }) {
  const _x = (x: number) => (options?.useCoordinateNotX) ? getCoordinateToX(x, direction) : x;
  const closestLabels = labels
    // filter out addresses on other side if there is a direction option
    .filter(labelData => (options?.direction) ? labelData.direction === options.direction : true)
    // filter out cross streets if that option is true
    .filter(labelData => (options?.excludeCrossStreets) ? !isNaN(Number(labelData.label)) : true)
    // filter out addresses without boundaries if that option is true
    .filter(labelData => (options?.excludeAddressesWithoutBoundaries) ? hasAddressData(labelData.label) : true)
    // filter for those with a larger coordinate
    .filter(labelData => (orientation === 'previous') ? labelData.x < _x(x) : true)
    .filter(labelData => (orientation === 'next') ? labelData.x > _x(x) : true)
    .sort((a, b) => {
      const coordinate = getXToCoordinate(_x(x), direction);
      if (orientation === 'previous') {
        return _x(b.x) - _x(a.x);
      }
      if (orientation === 'next') {
        return _x(a.x) - _x(b.x);
      }
      if (Math.abs(b.coordinate - coordinate) > Math.abs(a.coordinate - coordinate)) {
        return -1;
      }
      if (Math.abs(b.coordinate - coordinate) < Math.abs(a.coordinate - coordinate)) {
        return 1;
      }
      return 0;
    });
  return (closestLabels.length > 0) ? {
    addr: closestLabels[0].label,
    offset: Math.round(_x(x) - closestLabels[0].x),
    x,
  } : undefined;
}

/**
 * Given an address finds the closest address to the left (previous), right (next), or either (closest).
 * @param orientation Whether to get the previous address (left), the next (right) or closest
 * @param address An address
 * @param [options.direction] - A option to include only one side og the street
 * @param [options.excludeCrossStreets] - An option to exlude cross-streets
 * @returns The address, offset, and x value
 */
export function getProximateAddress(orientation: 'previous' | 'next' | 'closest', address: string, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean }) {
  const { x, direction } = getLabelFromAddress(address);
  const proximate = getProximateAddressFromX(orientation, x, direction, options);
  return (proximate) ? proximate.addr : undefined;
}

/**
 * Takes an address and finds all it's associated data
 * @param address - An address 
 * @returns The associated data for the address (@type {StripLabel})
 */
export function getLabelFromAddress(address: string) {
  return ensure(labels.find(label => label.label.replace(/\s+/g, '') === address.replace(/\s+/g, '')));
}

/**
 * Given an x, returns the x from the other side of the street
 * @param x An x on the number line
 * @returns An x on the number line on the other side of the street
 */
export function getOppositeX(x: number) {
  return maxX - x;
}

/**
 * Takes an x value and returns the corresponding address and offset, primarily used in the url.
 * @param x - The x value along the photo strip
 * @param direction - The side of the street
 * @param [options.direction] - A option to include only one side og the street
 * @param [options.excludeCrossStreets] - An option to exlude cross-streets
 * 
 * @returns The address and offset as a string concatenated by a hyphen or undefined
 */
export const getAddressOffsetString = (x: number, direction: Direction, options?: { direction?: Direction, excludeCrossStreets?: boolean }) => {
  const previousAddrAndOffset = getProximateAddressFromX('previous', x, direction, options);
  if (previousAddrAndOffset) {
    return `${previousAddrAndOffset.addr.replace(/\s+/g, '')}-${previousAddrAndOffset.offset}`;
  }
  const nextAddressAndOffset = getProximateAddressFromX('next', x, direction, options);
  if (nextAddressAndOffset) {
    return `${nextAddressAndOffset.addr.replace(/\s+/g, '')}-${nextAddressAndOffset.offset}`;
  }
  return undefined;
}

/**
 * Using a coordinate and direction, returns up to 5 of the nearest addresses.
 * @param coordinate The coordinate along the photo strip
 * @param direction The side of the street
 * @param [options.excludeCrossStreets] - An option to exlude cross-streets
 * 
 * @returns An array of addresses--just the labels
 */
export function getNearbyAddresses(coordinate: number, direction: Direction, options?: { excludeCrossStreets?: boolean }) {
  const x = getCoordinateToX(coordinate, direction);
  return labels
    .filter(d => !options || (options.excludeCrossStreets && !isNaN(parseInt(d.label))))
    .filter(d => d.direction === direction)
    .sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x))
    // filter to keep at least three addresses and no more than five addresses if those addresses are within 500pxs of the x coordinate
    .filter((d, idx) => idx <= 2 || (Math.abs(d.x - x) <= 500 && idx <= 4))
    .map(d => d.label);
}

/**
 * Takes the address-offset string and parses it to return the address and the offset as a number
 * @param addrOffset An address and offset as a string concatenated with hyphen
 * 
 * @returns The address and the offset separately along with the x value
 */
export function parseAddrOffset(addrOffset: string) {
  // look for two hyphens to accommodate negative values; those are necessary at the tail ends of the photo strips when there are photos but no addresses to the left
  const lastIndexOfHyphen = (addrOffset.includes('--')) ? addrOffset.lastIndexOf('-') - 1 : addrOffset.lastIndexOf('-');
  const addr = (lastIndexOfHyphen !== -1) ? addrOffset.slice(0, lastIndexOfHyphen) : addrOffset;
  const offset = (lastIndexOfHyphen !== -1) ? parseInt(addrOffset.slice(lastIndexOfHyphen + 1)) : 0
  return {
    addr,
    offset,
    x: getLabelFromAddress(addr).x + offset
  };
}

/**
 * Takes and address on one side of the street and an optional offset and returns the addrOffset string value across the street
 * @param address An address
 * @param direction The side of the street
 * @param offset (optional) An x offset
 * @returns An address, offset, and x value
 */
export function toggleDirectionAddrOffset(address: string, direction: Direction, offset?: number) {
  const newDirection = (direction === 'n') ? 's' : 'n';
  // get the best cooresponding address across the street
  // get the x for the address and the x for across the street
  const oldX = getLabelFromAddress(address).x + (offset || 0);
  const newX = maxX - oldX;
  // find the 
  return getProximateAddressFromX('previous', newX, newDirection, { direction: newDirection });
}

/**
 * Confirms an address is in the addresses with boundaries list
 * @param address An address
 * @returns Whether the address has boundaries or not
 */
export const hasAddressData = (address: string) => AddressesWithBoundaries.includes(address);

/**
 * Takes a longitude and crudely projects its x value in cartesian space 
 * @param lng The longitude value
 * @param width The width of the canvas
 * @returns The x value for the longitude
 */
export function convertLngtoX(lng: number, width: number): number {
  return (lng - latLngValues.midLng) * width / 2 / (latLngValues.maxLng - latLngValues.midLng);
}

/**
 * Takes a latitude and crudely projects its y value in cartesian space 
 * @param lat The latitude value
 * @param height The height of the canvas
 * @returns The y value for the latitude
 */
export function convertLattoY(lat: number, height: number): number {
  return height / 6 - ((lat - latLngValues.midLat) * height / 4 / (latLngValues.maxLat - latLngValues.midLat));
}

/**
 * Takes a lat/lng point and crudely projects its x/y values in cartesian space 
 * @param latLng The lat/long value
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @returns The xand y values on the canvas
 */
export function latLngToXY(latLng: Point, width: number, height: number): Point {
  return [convertLngtoX(latLng[1], width), convertLattoY(latLng[0], height)];
};
