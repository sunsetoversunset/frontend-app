import React from 'react';
import SelectableAddress from './SelectableAddress';
import { usePanoramaData, useAddresses } from '../../../../hooks';

const SelectableAddresses = () => {
  const { direction, years } = usePanoramaData();
  const addresses = useAddresses(direction);
  return (
    <>
      {addresses.map(d => (
        <SelectableAddress
          to={`/panorama/${direction}/${d.label.replace(/\s+/g, '')}/${years}`}
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