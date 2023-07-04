import { useAddressDataContext } from "../../../hooks";
import Table from "./Table/Index";

const OccupancyTable = () => {
  const { occupants_data } = useAddressDataContext();
  if (occupants_data.length === 0) {
    return null;
  }

  const sources = (
    <ul>
      <li>
        The Pacific Telephone and Telegraph Company,{" "}
        <a href="https://bit.ly/3AaPk6R" target="_blank">
          <cite>Los Angeles Street Address Directory</cite>
        </a>
        , July 1965, accessed via Los Angeles Public Library.
      </li>
      <li>
        Pacific Bell,{" "}
        <a href="https://bit.ly/2WERMok" target="_blank">
          <cite>Los Angeles Street Address Telephone Directory</cite>
        </a>
        , July 1973, accessed via Los Angeles Public Library.
      </li>
      <li>
        Pacific Bell,{" "}
        <a href="https://bit.ly/3FeQ4vo" target="_blank">
          <cite>Pacific Bell Street Address Telephone Directory</cite>
        </a>
        , Los Angeles, July 1987, accessed via Los Angeles Public Library.
      </li>
    </ul>
  );

  const hasUnit = occupants_data.some((occupant) => occupant.fragment);

  const rows = occupants_data
    .sort((a, b) => a.year - b.year)
    .map((entry, idx) => ({
      key: `${entry.year}-${entry.fragment}-${entry.entry}-${idx}`,
      data: (hasUnit)
        ? [entry.year, entry.fragment, entry.entry]
        : [entry.year, entry.entry]
    }));

  return <Table title="Occupants" sources={sources} headers={(hasUnit) ? ["Year", "Unit", "Occupants"] : ["Year", "Occupants"]} rows={rows}/>;
};

export default OccupancyTable;
