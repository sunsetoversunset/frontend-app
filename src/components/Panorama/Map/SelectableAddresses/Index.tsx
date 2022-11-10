import React from 'react';
import SelectableAddress from './SelectableAddress';
import { usePanoramaData, useAddresses } from '../../../../hooks';

const SelectableAddresses = () => {
  const { direction, yearsStr } = usePanoramaData();
  const addresses = useAddresses(direction);
  return (
    <>
      {addresses.map(d => (
        <SelectableAddress
          to={`/${direction}/${d.label.replace(/\s+/g, '')}/${yearsStr}`}
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