
import { Point } from './index.d';
import { Direction, StripLabel } from './index.d';
import stripLabels from './assets/data/strip_labels.json';
import GeoJson from './assets/data/sunset.json';

export const mult = 200;
export const maxX = Math.max(...stripLabels.map(d => d.c));

const minLat = Math.min(...stripLabels.map(d => d.lat));
const maxLat = Math.max(...stripLabels.map(d => d.lat));
const minLng = Math.min(...stripLabels.map(d => d.lng));
const maxLng = Math.max(...stripLabels.map(d => d.lng));
const midLat = maxLat - ((maxLat - minLat) / 2);
const midLng = maxLng - ((maxLng - minLng) / 2);

console.log([minLat, maxLng]);

export const labels: StripLabel[] = stripLabels
  // remove duplicates
  .filter((d, i, arr) => i === arr.findIndex(_d => _d.l === d.l))
  // map southern view the interverted x
  .map(d => ({
    label: d.l.toString(),
    direction: d.s as Direction,
    x: (d.s === 'n') ? d.c * mult : (maxX - d.c) * mult,
  }))
  .sort((a, b) => a.x - b.x);

export const getWesternmostLabel = (direction?: Direction): StripLabel => (direction) ? labels.find(label => label.direction === direction) as StripLabel : labels[0];

export const getEasternmostLabel = (direction?: Direction): StripLabel => (direction) ? labels.sort((a, b) => b.x - a.x).find(label => label.direction === direction) as StripLabel : labels[labels.length - 1];

export const getOppositeX = (x: number) => maxX * mult - x;

export const addressToCoordinate = (address: string) => {
  const { c: coordinate, s: direction } = (stripLabels.find(d => d.l.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as any);
  return (direction === 'n') ? coordinate * mult : getOppositeX(coordinate * mult);
}

export const addressToCoordinateUnflipped = (address: string) => {
  const { c: coordinate } = (stripLabels.find(d => d.l.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as any);
  return coordinate * mult;
}

/* with an x value finds the nearest label and offset below it */
export const getClosestAddressBelow = (x: number, direction?: Direction) => {
  const closestAddresses = labels
    .filter(d => (direction) ? d.direction === direction : true)
    .filter(d => d.x <= x)
    .sort((a, b) => b.x - a.x);

  return (closestAddresses.length > 0) ? {
    addr: closestAddresses[0].label,
    offset: x - closestAddresses[0].x,
  } : null;
}

/* with an x value finds the nearest label and offset above it */
export const getClosestAddressAbove = (x: number, direction?: Direction) => {
  const closestAddresses = labels
    .filter(d => (direction) ? d.direction === direction : true)
    .filter(d => d.x >= x)
    .sort((a, b) => a.x - b.x);
  return {
    addr: closestAddresses[0].label,
    offset: x - closestAddresses[0].x,
  }
}

/* with an x value finds the nearest label to it, by default below and above it there isn't one below */
export const coordinateToAddress = (x: number, direction?: Direction) => {
  // find the address that is closest but less than the coordinate
  return getClosestAddressBelow(x, direction) || getClosestAddressAbove(x, direction) || null;
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
  return `${newAddrData.addr.toString().replace(/\s+/g, '')}-${Math.round(Math.max(0, newAddrData.offset))}`;
}

export function toggleDirectionAddrOffset(addrOffset: string, direction: Direction) {
  const newDirection = (direction === 'n') ? 's' : 'n';
  // get the best cooresponding address across the street
  const coordinate = addrOffsetToCoordinate(addrOffset)
  const newAddrData = coordinateToAddress(getOppositeX(coordinate), newDirection);
  return `${newAddrData.addr}-${Math.round(newAddrData.offset)}`;
}

// adapted from https://stackoverflow.com/questions/33907276/calculate-point-between-two-coordinates-based-on-a-percentage
const midPoint = (point1: Point, point2: Point, per: number) => [point1[0] + (point2[0] - point1[0]) * per, point1[1] + (point2[1] - point1[1]) * per];

export const coordinateToPoint = (coordinate: number, maxCoordinate: number, strip_labels: any) => {
  // find the point it's on or points it's between
  const percentAlongPath = coordinate / maxCoordinate;
  const pointsBelow = strip_labels
    .filter((d: any) => d.c * mult / maxCoordinate <= percentAlongPath)
    .sort((a: any, b: any) => b.c - a.c);
  console.log(pointsBelow);
  const pointBelow = (pointsBelow.length > 0) ? pointsBelow[0] : {c:0}; // GGDN tweaked for fallback
  const pointsAbove = strip_labels
    .filter((d: any) => d.c * mult / maxCoordinate > percentAlongPath)
    .sort((a: any, b: any) => a.c - b.c);
  const pointAbove = pointsAbove[0];

  const pointBelowPercent = pointBelow.c * mult / maxCoordinate;
  const pointAbovePercent = pointAbove.c * mult / maxCoordinate;
  const percentBetween = (percentAlongPath - pointBelowPercent) / (pointAbovePercent - pointBelowPercent)
  console.log(percentAlongPath, pointBelowPercent, pointAbovePercent, percentBetween);

  // figure out how close the coordinate is to each of the points
  const point = midPoint([pointBelow.lng, pointBelow.lat], [pointAbove.lng, pointAbove.lat], percentBetween);
  console.log(point);
  console.log(pointBelow);
  console.log([pointBelow.lng, pointBelow.lat]);
  console.log(pointAbove);
  console.log([pointAbove.lng, pointAbove.lat]);
  console.log(point);
  return point;
}


export const getRoadPath = () => {
  const points = GeoJson.geometry.coordinates[0];
  const [firstX, firstY] = latLngToXY([points[0][1], points[0][0]]);
  console.log(points[0], firstX, firstY);
  const lineSegments = points
    .slice(1)
    .map((point) => {
      const [x , y] = latLngToXY([point[1], point[0]])
      return `L ${x} ${y}`;
    });

  return `M ${firstX} ${firstY} ${lineSegments.join(" ")}`;
};

export const convertLngtoX = (lng: number): number => (lng - midLng) * 500 / (maxLng - midLng);

export const convertLattoY = (lat: number): number => 37.5 - ((lat - midLat) * 75 / (maxLat - midLat));

export const latLngToXY = (latLng: Point): Point => [convertLngtoX(latLng[1]), convertLattoY(latLng[0])];
