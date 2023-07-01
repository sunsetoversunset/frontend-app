import { useAddressDataContext } from '../../../hooks';
import '../../../styles/Tables.scss';
import * as Styled from './styled';

const OccupancyTable = () => {
  const { occupants_data } = useAddressDataContext();
  if (occupants_data.length === 0) {
    return null;
  }

  return (
    <Styled.DataTable>
      <Styled.Title>Occupants</Styled.Title>
      <Styled.Tooltip>
        Sources
        <Styled.TooltipContent>
          <ul>
            <li>The Pacific Telephone and Telegraph Company, <a href="https://bit.ly/3AaPk6R" target="_blank"><cite>Los Angeles Street Address Directory</cite></a>, July 1965, accessed via Los Angeles Public Library.</li>
            <li>Pacific Bell, <a href="https://bit.ly/2WERMok" target="_blank"><cite>Los Angeles Street Address Telephone Directory</cite></a>, July 1973, accessed via Los Angeles Public Library.</li>
            <li>Pacific Bell, <a href="https://bit.ly/3FeQ4vo" target="_blank"><cite>Pacific Bell Street Address Telephone Directory</cite></a>, Los Angeles, July 1987, accessed via Los Angeles Public Library.</li>
          </ul>
        </Styled.TooltipContent>
      </Styled.Tooltip>
      <Styled.Table>
        <thead>
          <Styled.Row>
            <Styled.TableHeader>Year</Styled.TableHeader>
            {occupants_data.some(occupant => occupant.fragment) && (
              <Styled.TableHeader>Unit</Styled.TableHeader>
            )}
            <Styled.TableHeader>Occupants</Styled.TableHeader>
          </Styled.Row>
        </thead>

        <tbody>
          {occupants_data
            .sort((a, b) => a.year - b.year)
            .map((entry, idx) => (
              <Styled.Row key={`${entry.year}-${entry.fragment}-${entry.entry}-${idx}`}>
                <Styled.Data>{entry.year}</Styled.Data>
                {occupants_data.some(occupant => occupant.fragment) && (
                  <Styled.Data>{entry.fragment}</Styled.Data>
                )}
                <Styled.Data textAlign='left'>{entry.entry}</Styled.Data>
              </Styled.Row>
            )
            )}
        </tbody>
      </Styled.Table>
    </Styled.DataTable>
  );
};

export default OccupancyTable;