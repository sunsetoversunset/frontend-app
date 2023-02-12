import React from 'react';
import { useLocation } from 'react-router-dom';
import SelectableAddress from './SelectableAddress';
import { usePanoramaData, useAddresses } from '../../../../hooks';

const SelectableAddresses = () => {
  const { direction, yearsStr } = usePanoramaData();
  const addresses = useAddresses(direction);
  const { pathname } = useLocation();
  const refining = pathname.startsWith('/refine');
  return (
    <>
      {addresses.map(d => (
        <SelectableAddress
          to={`${(refining) ? `/refine` : ''}/${direction}/${d.label.replace(/\s+/g, '')}/${yearsStr}`}
          key={`addr${d.label}`}
          x={d.mapX}
          y={d.mapY}
          label={d.label}
        />
      ))}
    </>
  );
};

export default SelectableAddresses;