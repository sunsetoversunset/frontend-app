import { useContext } from 'react';
import { AddressDataContext } from '../../Contexts';
import { AddressData } from '../../types/AddressView.d';
import '../../styles/Tables.scss';

const OccupancyTable = () => {
  const { occupants_data } = useContext(AddressDataContext) as AddressData;
  if (occupants_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"occupancyTable dataTable "}
    >
      <h1>Occupants</h1>
      <table>
        <thead>
          <tr className="year">
            <th>Year</th>
            {occupants_data.some(occupant => occupant.fragment) && (
              <th>Unit</th>
            )}
            <th>Occupants</th>
          </tr>
        </thead>

        <tbody>
          {occupants_data
            .sort((a, b) => a.year - b.year)
            .map((entry, idx) => (
              <tr key={`${entry.year}-${entry.fragment}-${entry.entry}-${idx}`}>
                <td>{entry.year}</td>
                {occupants_data.some(occupant => occupant.fragment) && (
                  <td>{entry.fragment}</td>
                )}
                <td>{entry.entry}</td>
              </tr>
            )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default OccupancyTable;