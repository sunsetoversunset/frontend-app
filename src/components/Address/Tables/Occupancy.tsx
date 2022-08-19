import { useAddressDataContext } from '../../../hooks';
import '../../../styles/Tables.scss';

const OccupancyTable = () => {
  const { occupants_data } = useAddressDataContext();
  if (occupants_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"occupancyTable dataTable "}
    >
      <h1>Occupants</h1>
      <h4 className='tooltip sources'>
        Sources
        <span className="tooltiptext">
          <ul>
            <li>The Pacific Telephone and Telegraph Company, <a href="https://bit.ly/3AaPk6R" target="_blank"><cite>Los Angeles Street Address Directory</cite></a>, July 1965, accessed via Los Angeles Public Library.</li>
            <li>Pacific Bell, <a href="https://bit.ly/2WERMok" target="_blank"><cite>Los Angeles Street Address Telephone Directory</cite></a>, July 1973, accessed via Los Angeles Public Library.</li>
            <li>Pacific Bell, <a href="https://bit.ly/3FeQ4vo" target="_blank"><cite>Pacific Bell Street Address Telephone Directory</cite></a>, Los Angeles, July 1987, accessed via Los Angeles Public Library.</li>
          </ul>
        </span>
      </h4>
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