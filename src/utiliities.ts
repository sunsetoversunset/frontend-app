
import { Point } from './index.d';
import { Direction, StripLabel } from './index.d';
import stripLabels from './assets/data/strip_labels.json';
import AddressesWithBoundaries from './assets/data/addresses_with_boundaries.json';
import GeoJson from './assets/data/sunset.json';


// the multiplier used for the placement of the photos on the strip for the panorama view
export const mult = 200;
// the maximum coordinate value among all the addresses
export const maxX = Math.max(...stripLabels.map(d => d.c * mult));

export const getCoordinateToX = (coordinate: number, direction: Direction) => (direction === 'n') ? coordinate * mult : maxX - coordinate * mult;

// the raw strip labels data positionin data 
export const labels: StripLabel[] = stripLabels
  // remove duplicates
  .filter((d, i, arr) => i === arr.findIndex(_d => _d.l === d.l))
  // todo: fix the data error instead of ignoring it: theses addresses have incorrecto coordinates
  .filter(d => d.l !== 1332)
  // map southern view the interverted x
  .map(d => ({
    label: d.l.toString(),
    direction: d.s as Direction,
    x: getCoordinateToX(d.c, d.s as Direction), // (d.s === 'n') ? d.c * mult : (maxX - d.c * mult),
    coordinate: d.c,
    lat: d.lat,
    lng: d.lng,
    percentAlongPath: d.c * mult / maxX,
    rotation: d.r,
  }))
  .sort((a, b) => a.x - b.x);

// these are just copied out of the baserow data--they shouldn't change, and there's no reason to load the photos data files asyncronously just to get them.
export const maxXs = {
  '1966': 163.47121 * mult,
  '1973': 977.54089 * mult,
  '1985': 979.36723 * mult,
  '1995': 984.23148 * mult,
  '2007': 993.27018 * mult,
};

export const maxMaxX = Math.max(...Object.values(maxXs));

export const easternMostAddresses = {
  '1966': ensure(getClosestAddressBelow(maxXs['1966'], { direction: 'n' })).addr,
  '1973': ensure(getClosestAddressBelow(maxXs['1973'], { direction: 'n' })).addr,
  '1985': ensure(getClosestAddressBelow(maxXs['1985'], { direction: 'n' })).addr,
  '1995': ensure(getClosestAddressBelow(maxXs['1995'], { direction: 'n' })).addr,
  '2007': ensure(getClosestAddressBelow(maxXs['2007'], { direction: 'n' })).addr,
};

export const easternLongitudes = {
  '1966': ensure(labels.find(d => d.label === easternMostAddresses['1966'])).lng,
  '1973': ensure(labels.find(d => d.label === easternMostAddresses['1973'])).lng,
  '1985': ensure(labels.find(d => d.label === easternMostAddresses['1985'])).lng,
  '1995': ensure(labels.find(d => d.label === easternMostAddresses['1995'])).lng,
  '2007': ensure(labels.find(d => d.label === easternMostAddresses['2007'])).lng,
}

// the minimum, maximums, and middle latitudes of the addresses
const minLat = Math.min(...stripLabels.map(d => d.lat));
const maxLat = Math.max(...stripLabels.map(d => d.lat));
const minLng = Math.min(...stripLabels.map(d => d.lng));
const maxLng = Math.max(...stripLabels.map(d => d.lng));
const midLat = maxLat - ((maxLat - minLat) / 2);
const midLng = maxLng - ((maxLng - minLng) / 2);

// from https://stackoverflow.com/questions/54738221/typescript-array-find-possibly-undefind
export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

// the ratio of the latitude and longitude, used for sizing the width and height of the map
export const lngToLatRatio = (maxLng - minLng) / (maxLat - minLat);



export function getAddressField(address: string, field: keyof StripLabel) {
  const addressData = labels.find(label => label.label.replace(/\s+/g, '') === address) as StripLabel;
  return addressData[field];
}

export function getAddressX(address: string) {
  const addressData = labels.find(label => label.label.replace(/\s+/g, '') === address) as StripLabel;
  return addressData.x;
}

export function getAddressCoordinate(address: string) {
  const addressData = labels.find(label => label.label.replace(/\s+/g, '') === address) as StripLabel;
  return addressData.coordinate;
}

export const getWesternmostLabel = (direction?: Direction): StripLabel => (direction) ? labels.find(label => label.direction === direction) as StripLabel : labels[0];

export const getEasternmostLabel = (direction?: Direction): StripLabel => (direction) ? labels.sort((a, b) => b.x - a.x).find(label => label.direction === direction) as StripLabel : labels[labels.length - 1];

// todo: is this necessary given you've translated the x values in the labels variable above?
export const getOppositeX = (x: number) => maxX - x;

// `newCenter` is x coordinate centered in the strip. By default, it's half the width of the screen to position the leftmost photos left
export const getCenter = (addrOffset: string, width: number) => Math.min(maxX * mult - width / 2, Math.max(width / 2, addrOffsetToCoordinate(addrOffset)));


export const addressToCoordinate = (address: string) => {
  const { x, direction } = (labels.find(d => d.label.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as StripLabel);
  return (direction === 'n') ? x : getOppositeX(x);
}

export const addressToCoordinateUnflipped = (address: string) => {
  const { x } = (labels.find(d => d.label.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as StripLabel);
  return x;
}

export function getProximateAddress(previousOrNext: 'previous' | 'next', address: string, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean }) {
  const addressLabelData = ensure(labels.find(d => d.label.toString() === address), `error with label ${address}`);
  const closestLabels = labels
    // filter out addresses on othe side if there is a direction option
    .filter(labelData => (options?.direction) ? labelData.direction === options.direction : true)
    // filter out cross streets if that option is true
    .filter(labelData => (options?.excludeCrossStreets) ? !isNaN(Number(labelData.label)) : true)
    // filter out addresses without boundaries if that option is true
    .filter(labelData => (options?.excludeAddressesWithoutBoundaries) ? hasAddressData(labelData.label) : true)
    // filter for those with a larger coordinate
    .filter(labelData => (previousOrNext === 'previous')
      ? labelData.x < addressLabelData.x
      : labelData.x > addressLabelData.x)
    .sort((a, b) => (previousOrNext === 'previous')
      ? b.x - a.x
      : a.x - b.x);
  return (closestLabels.length > 0) ? closestLabels[0].label : undefined;
}

export function getPreviousAddress(address: string, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean }) {
  return getProximateAddress('previous', address, options); //
}

export function getNextAddress(address: string, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean }) {
  return getProximateAddress('next', address, options); //
}

/* with an x value finds the nearest label and offset below it */
// todo direction shouldn't be an option but required as it you can't compare x values for different sides of the street
export function getClosestAddressBelow(x: number, options?: { direction?: Direction, excludeCrossStreets?: boolean, excludeAddressesWithoutBoundaries?: boolean }): { addr: string, offset: number } | undefined {
  const closestAddresses = labels
    .filter(d => (options && options.direction) ? d.direction === options.direction : true)
    .filter(d => (options && options.excludeCrossStreets) ? !isNaN(Number(d.label)) : true)
    .filter(d => d.x <= x)
    .sort((a, b) => b.x - a.x);
  if (closestAddresses.length > 0) {
    if (!options || !options.excludeAddressesWithoutBoundaries) {
      return {
        addr: closestAddresses[0].label,
        offset: Math.round(x - closestAddresses[0].x),
      }
    } else {
      console.log(closestAddresses[0]);
      return getClosestAddressBelow(closestAddresses[0].x, options);
    }
  }
  return undefined;
}

export const getClosestAddressBelowString = (x: number, options?: { direction?: Direction, excludeCrossStreets?: boolean }) => {
  const addressAndOffset = getClosestAddressBelow(x, options);
  if (addressAndOffset) {
    return `${addressAndOffset.addr.replace(/\s+/g, '')}-${addressAndOffset.offset}`;
  }
  return undefined;
}

/* with an x value finds the nearest label and offset above it */
export const getClosestAddressAbove = (x: number, options?: { direction?: Direction, excludeCrossStreets?: boolean }) => {
  const closestAddresses = labels
    .filter(d => (options && options.direction) ? d.direction === options.direction : true)
    .filter(d => (options && options.excludeCrossStreets) ? !isNaN(Number(d.label)) : true)
    .filter(d => d.x >= x)
    .sort((a, b) => a.x - b.x);
  return (closestAddresses.length > 0) ? {
    addr: closestAddresses[0].label,
    offset: x - closestAddresses[0].x,
  } : null;
}

export const getClosestAddress = (x: number, options?: { direction?: Direction, excludeCrossStreets?: boolean }) => {
  // the 2.2448 here is the standard deviation from all the address boundaries. Those vary quite a bit, so this may be imperfect.
  const closestBelow = getClosestAddressBelow(x, options);
  const closestAbove = getClosestAddressAbove(x, options);
  if (closestBelow && closestAbove) {
    if (closestBelow.offset <= Math.abs(closestAbove.offset)) {
      return closestBelow.addr;
    }
    return closestAbove.addr;
  } else if (closestBelow) {
    return closestBelow.addr;
  } else if (closestAbove) {
    return closestAbove.addr;
  } else {
    return '9157';
  }
}

export const getNearbyAddresses = (coordinate: number, direction: Direction, options?: { excludeCrossStreets?: boolean }) => {
  const x = getCoordinateToX(coordinate, direction);
  return labels
    .filter(d => !options || (options.excludeCrossStreets && !isNaN(parseInt(d.label))))
    .filter(d => d.direction === direction)
    .sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x))
    // filter to keep at least three addresses and no more than five addresses if those addresses are within 500pxs of the x coordinate
    .filter((d, idx) => idx <= 2 || Math.abs(d.x - x) <= 500)
    .map(d => d.label);

  // the 2.2448 here is the standard deviation from all the address boundaries. Those vary quite a bit, so this may be imperfect.
  // return labels
  //   .filter(d => (options && options.direction) ? d.direction === options.direction : true)
  //   .filter(d => !isNaN(Number(d.label)))
  //   .filter(d => d.x >= x - 100 && d.x <= x + 100)
  //   .sort((a, b) => a.x - b.x)
  //   .map(d => d.label);
}

/* with an x value finds the nearest label to it, by default below and above it there isn't one below */
export const coordinateToAddress = (coordinate: number, direction: Direction, options?: { excludeCrossStreets?: boolean }) => {
  const x = getCoordinateToX(coordinate, direction);
  // find the address that is closest but less than the coordinate
  const _options = {
    ...options,
    side: direction,
  }
  return getClosestAddressBelow(x, _options) || getClosestAddressAbove(x, _options) || null;
}

export function parseAddrOffset(addrOffset: string) {
  const lastIndexOfHyphen = addrOffset.lastIndexOf('-');
  const addr = (lastIndexOfHyphen !== -1) ? addrOffset.slice(0, lastIndexOfHyphen) : addrOffset;
  const offset = (lastIndexOfHyphen !== -1) ? parseInt(addrOffset.slice(lastIndexOfHyphen + 1)) : 0
  return {
    addr,
    offset,
  };
}

export function addrOffsetToCoordinate(addrOffset: string) {
  const { addr, offset } = parseAddrOffset(addrOffset);
  return addressToCoordinate(addr) + offset;
}

/* takes an addrOffset and an x to offset it by and returns another addrOffset adjusted left/right or west/east */
export function calcAddrOffset(addrOffset: string, direction: Direction, offsetBy: number) {
  const newAddrData = coordinateToAddress(addrOffsetToCoordinate(addrOffset) + offsetBy, direction);
  return (newAddrData) ? `${newAddrData.addr.toString().replace(/\s+/g, '')}-${Math.round(Math.max(0, newAddrData.offset))}` : null;
}

export function toggleDirectionAddrOffset(address: string, direction: Direction, offset?: number) {
  const newDirection = (direction === 'n') ? 's' : 'n';
  // get the best cooresponding address across the street
  // get the x for the address and the x for across the street
  const oldX = getAddressX(address) + (offset || 0);
  const newX = maxX - oldX;
  // find the 
  return getClosestAddressBelow(newX, { direction: newDirection });
}

// export function toggleDirectionAddrOffsetOld(addrOffset: string, direction: Direction) {
//   const newDirection = (direction === 'n') ? 's' : 'n';
//   // get the best cooresponding address across the street
//   const coordinate = addrOffsetToCoordinate(addrOffset)
//   const newAddrData = coordinateToAddress(getOppositeX(coordinate), { direction: newDirection });
//   return (newAddrData) ? `${newAddrData.addr.toString().replace(/\s+/g, '')}-${Math.round(Math.max(0, newAddrData.offset))}` : null;
// }

// adapted from https://stackoverflow.com/questions/33907276/calculate-point-between-two-coordinates-based-on-a-percentage
const midPoint = (point1: Point, point2: Point, per: number) => [point1[0] + (point2[0] - point1[0]) * per, point1[1] + (point2[1] - point1[1]) * per];

export const coordinateToPoint = (coordinate: number, maxCoordinate: number, strip_labels: any) => {
  // find the point it's on or points it's between
  const percentAlongPath = coordinate / maxCoordinate;
  const pointsBelow = strip_labels
    .filter((d: any) => d.c * mult / maxCoordinate <= percentAlongPath)
    .sort((a: any, b: any) => b.c - a.c);
  const pointBelow = (pointsBelow.length > 0) ? pointsBelow[0] : { c: 0 };
  const pointsAbove = strip_labels
    .filter((d: any) => d.c * mult / maxCoordinate > percentAlongPath)
    .sort((a: any, b: any) => a.c - b.c);
  const pointAbove = (pointsAbove.length > 0) ? pointsAbove[0] : { c: Math.max(strip_labels.map((strip_label: any) => strip_label.c)) };

  const pointBelowPercent = pointBelow.c * mult / maxCoordinate;
  const pointAbovePercent = pointAbove.c * mult / maxCoordinate;
  const percentBetween = (percentAlongPath - pointBelowPercent) / (pointAbovePercent - pointBelowPercent)

  // figure out how close the coordinate is to each of the points
  const point = midPoint([pointBelow.lng, pointBelow.lat], [pointAbove.lng, pointAbove.lat], percentBetween);
  return point;
}

export const getRoadPath = (width: number) => {
  const points = GeoJson.geometry.coordinates[0];
  const [firstX, firstY] = latLngToXY([points[0][1], points[0][0]], width);
  const lineSegments = points
    .slice(1)
    .map((point) => {
      const [x, y] = latLngToXY([point[1], point[0]], width)
      return `L ${x} ${y}`;
    });

  return `M ${firstX} ${firstY} ${lineSegments.join(" ")}`;
};

export const hasAddressData = (address: string) => AddressesWithBoundaries.includes(address);

export const convertLngtoX = (lng: number, width: number): number => (lng - midLng) * width / 2 / (maxLng - midLng);

export const convertLattoY = (lat: number): number => 10 - ((lat - midLat) * 55 / (maxLat - midLat));

export const latLngToXY = (latLng: Point, width: number): Point => [convertLngtoX(latLng[1], width), convertLattoY(latLng[0])];
