
import { Direction, URLParams, Point } from './index.d';
import { LinkAction } from './actions';
import stripLabels from './assets/data/strip_labels.json';

export const mult = 200;
export const maxX = Math.max(...stripLabels.map(d => d.c));

export const labels = stripLabels
  // remove duplicates
  .filter((d, i, arr) => i === arr.findIndex(_d => _d.l === d.l))
  // map southern view the interverted x
  .map(d => ({
    label: d.l,
    direction: d.s,
    x: (d.s === 'n') ? d.c * mult : (maxX - d.c) * mult,
  }));

export const getOppositeX = (x: number) => maxX * mult - x;

export const addressToCoordinate = (address: string) => {
  const { c: coordinate, s: direction } = (stripLabels.find(d => d.l.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as any);
  return (direction === 'n') ? coordinate * mult : getOppositeX(coordinate * mult);
}

export const addressToCoordinateUnflipped = (address: string) => {
  const { c: coordinate } = (stripLabels.find(d => d.l.toString().replace(/\s+/g, '') === address.replace(/\s+/g, '')) as any);
  return coordinate * mult;
}

export const coordinateToAddress = (x: number, direction?: Direction) => {
  // find the address that is closest but less than the coordinate
  const closestAddresses = labels
    .filter(d => (direction) ? d.direction === direction : true)
    .filter(d => d.x <= x)
    .sort((a, b) => b.x - a.x);
  if (closestAddresses.length > 0) {
    return {
      addr: closestAddresses[0].label,
      offset: x - closestAddresses[0].x,
    };
  } else {
    // TODO
    return {
      addr: 'todo',
      offset: 0,
    }
  }
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

export function calcAddrOffset(addrOffset: string, direction: Direction, offsetBy: number) {
  const newAddrData = coordinateToAddress(addrOffsetToCoordinate(addrOffset) + offsetBy, direction);
  return `${newAddrData.addr}-${Math.round(newAddrData.offset)}`;
}

export function toggleDirectionAddrOffset(addrOffset: string, direction: Direction) {
  const newDirection = (direction === 'n') ? 's' : 'n';
  // get the best cooresponding address across the street
  const coordinate = addrOffsetToCoordinate(addrOffset)
  const newAddrData = coordinateToAddress(getOppositeX(coordinate), newDirection);
  return `${newAddrData.addr}-${Math.round(newAddrData.offset)}`;
}

export function makePanoramaLink(state: URLParams, action: LinkAction): string {
  const { direction, addrOffset } = state;
  const [addr, offsetStr] = (addrOffset) ? addrOffset.split('-') : [9102, '0'];
  const offset = parseInt(offsetStr);
  let newDirection = direction || 'n';
  let newAddr = addr;
  let newOffset = (offset) ? offset : 0;
  if (action.type === 'toggle_direction') {
    newDirection = (newDirection === 'n') ? 's' : 'n';
    // get the best cooresponding address across the street
    if (addr) {
      const newAddrData = coordinateToAddress(getOppositeX(addressToCoordinate(addr.toString()) + newOffset), newDirection);
      if (newAddrData) {
        newAddr = newAddrData.addr.toString().replace(/\s+/g, '');
        newOffset = newAddrData.offset;
      }
    }
  }

  if (action.type === 'scroll') {
    // TODO: this action.payload part isn't right at all; this when the address isn't specified, so I think it's always half the width
    const currCoordinate = (addr) ? addressToCoordinate(addr.toString()) + newOffset : action.payload;
    const newAddrData = coordinateToAddress(currCoordinate + action.payload, newDirection);
    if (newAddrData) {
      newAddr = newAddrData.addr.toString().replace(/\s+/g, '');
      newOffset = newAddrData.offset;
    }
  }

  let newPath = '/panorama';
  if (newDirection) {
    newPath += `/direction/${newDirection}`;
  }
  if (newAddr) {
    newPath += `/addr/${newAddr}`;
  }
  if (newOffset) {
    newPath += `/offset/${Math.round(newOffset)}`;
  }

  return newPath;
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
  const pointBelow = (pointsBelow.length > 0) ? pointsBelow[0] : null;
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
  console.log(pointBelow);
  console.log([pointBelow.lng, pointBelow.lat]);
  console.log(pointAbove);
  console.log([pointAbove.lng, pointAbove.lat]);
  console.log(point);
  return point;
}