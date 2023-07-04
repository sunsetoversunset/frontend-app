import { useAddressDataContext, useAppContext } from "../../../hooks";
import { CensusField, DecadeIndex } from "../../../types/AddressView";
import Table from "./Table/Index";
import * as Styled from './Table/styled';
import * as Types from './Table/types';

const CensusTable = () => {
  const { census_data } = useAddressDataContext();
  const { width } = useAppContext();
  
  const CensusDataColumns = (key: CensusField, unit: "%" | "$" | "number") => {
    const format = (unit: "%" | "$" | "number", value: number | string | undefined) => {
      if (value === undefined) {
        return <span className="no_data">no data</span>;
      }
      if (unit === "%" && typeof value === "number") {
        return `${Math.round(value * 10000) / 100}%`;
      }
      if (unit === "$" && typeof value === "number") {
        if (width <= 1000 && value >= 1000) {
          return `$${value / 1000}K`;
        }
        return `$${value.toLocaleString()}`;
      }
      if (unit === "number" && typeof value === "number") {
        return value.toLocaleString();
      }
      return value;
    };
    return (
      <>
        {[1960, 1970, 1980, 1990, 2000, 2010].map((decade) => {
          if (census_data[key] && census_data[key][decade as DecadeIndex]) {
            return (
              <td className="value" key={`${key}${decade}`}>
                {format(unit, census_data[key][decade as DecadeIndex])}
              </td>
            );
          } else {
            return <td className="empty" key={`${key}${decade}`} />;
          }
        })}
      </>
    );
  };

  const sources = (
    <>
          U.S. Bureau of the Census, <cite>Census of Population and Housing, 1960-2010</cite>, accessed via{" "}
        <a href="https://www.socialexplorer.com/" target="_blank" rel="noreferrer">
          Social Explorer
        </a>{" "}
        and{" "}
        <a href="https://www.nhgis.org/" target="_blank" rel="noreferrer">
          IPUMS National Historical Geographic Information System (NHGIS)
        </a>
        .
    </>
  )

  const emptyTableHeader: Types.StyledDataElement = {
    datum: '',
    style: {
      background_color: 'inherit',
      border_color: 'transparent',
    }
  };

  const headers: Types.HeaderElement[] = (width > 1000) ? [{key: 'emptycell1', content: emptyTableHeader}, {key: 'emptycell2', content: emptyTableHeader}] : [{key: 'emptycell1', content: emptyTableHeader}];
  [1960, 1970, 1980, 1990, 2000, 2010].forEach((decade) => {
    headers.push({
      key: `${decade}`,
      content: (
      <>
                {decade}
                <br />
                <Styled.Deemphasize>{`Tract ${census_data.tracts[decade as DecadeIndex]}`}</Styled.Deemphasize>
      </>
      )
      }) 
  })

  const rows:{
    key: string;
    data: Types.DataElement[];
  }[] = []


  return  <Table title="Census" sources={sources} headers={headers} rows={rows} />;
};

export default CensusTable;
