
import { Direction, URLParams } from './index.d';
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
  }
  return null;
}

export function makePanoramaLink(state: URLParams, action: LinkAction): string {
  const { direction, addr, offset } = state;
  let newDirection = direction || 'n';
  let newAddr = addr;
  let newOffset = (offset) ? parseFloat(offset) : 0;
  if (action.type === 'toggle_direction') {
    newDirection = (newDirection === 'n') ? 's' : 'n';
    // get the best cooresponding address across the street
    if (addr) {
      const newAddrData = coordinateToAddress(getOppositeX(addressToCoordinate(addr) + newOffset), newDirection);
      if (newAddrData) {
        newAddr = newAddrData.addr.toString().replace(/\s+/g, '');
        newOffset = newAddrData.offset;
      }
    }
  }

  if (action.type === 'scroll') {
    // TODO: this action.payload part isn't right at all; this when the address isn't specified, so I think it's always half the width
    const currCoordinate = (addr) ? addressToCoordinate(addr) + newOffset : action.payload;
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