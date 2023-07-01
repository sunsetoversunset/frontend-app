import { useAddressDataContext } from "../../../hooks";
import { CensusField, DecadeIndex } from "../../../types/AddressView";
import { useAppContext } from "../../../hooks";
import "../../../styles/Tables.scss";
import * as Styled from './styled';

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

  if (
    ![1960, 1970, 1980, 1990, 2000, 2010].some((decade) => {
      return census_data.tracts && census_data.tracts[decade as DecadeIndex];
    })
  ) {
    return null;
  }

  return (
    <div className={"censusTable dataTable "}>
      <h1>Census</h1>
      <h4 className="tooltip sources">
        Sources
        <span className="tooltiptext">
          U.S. Bureau of the Census, <cite>Census of Population and Housing, 1960-2010</cite>, accessed via{" "}
          <a href="https://www.socialexplorer.com/" target="_blank">
            Social Explorer
          </a>{" "}
          and{" "}
          <a href="https://www.nhgis.org/" target="_blank">
            IPUMS National Historical Geographic Information System (NHGIS)
          </a>
          .
        </span>
      </h4>
      <table>
        <thead>
          <tr className="year">
            <Styled.EmptyTableHeader colSpan={width > 1000 ? 2 : 1} />
            {[1960, 1970, 1980, 1990, 2000, 2010].map((decade) => (
              <th key={`censusTableHeaderFor${decade}`}>
                {decade}
                <br />
                <span className="deemphasize">{`Tract ${census_data.tracts[decade as DecadeIndex]}`}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="last-of-type">
            <td colSpan={width > 1000 ? 2 : 1}>Total Population</td>
            {CensusDataColumns("total_pop", "number")}
          </tr>
          <tr>
            {width > 1000 && (
              <td rowSpan={3} className="type">
                Race
              </td>
            )}
            <td>% White</td>
            {CensusDataColumns("race_white", "%")}
          </tr>
          <tr>
            <td>% Black</td>
            {CensusDataColumns("race_black", "%")}
          </tr>
          <tr className="last-of-type">
            <td className="tooltip">
              % Spanish / Hispanic
              <span className="tooltiptext">1960 displays persons with Puerto Rican or Spanish surnames. 1970 and 1980 display persons with Spanish origin or descent. 1990 and onwards display Hispanic and Latino persons.</span>
            </td>
            {CensusDataColumns("race_span_hisp", "%")}
          </tr>

          <tr>
            {width > 1000 && (
              <td rowSpan={3} className="type tooltip">
                Foreign-born
                <span className="tooltiptext">First reported in 1970</span>
              </td>
            )}
            <td>{width > 1000 ? "% Total" : "% Foreign Born"}</td>
            {CensusDataColumns("foreign_born_pop", "%")}
          </tr>
          <tr>
            <td>% Noncitizen</td>
            {CensusDataColumns("foreign_noncitizens", "%")}
          </tr>
          <tr className="last-of-type">
            <td>% Naturalized Citizen</td>
            {CensusDataColumns("foreign_naturalized", "%")}
          </tr>

          <tr>
            {width > 1000 && (
              <td rowSpan={3} className="type">
                Education
              </td>
            )}
            <td className="tooltip">
              % w/High School
              <span className="tooltiptext">Data for population 25 years and over. Before 1990, data display persons who attended high school. Data for 1990 and onwards display persons who have graduated with a high school diploma.</span>
            </td>
            {CensusDataColumns("educ_hs", "%")}
          </tr>
          <tr>
            <td className="tooltip">
              % w/College
              <span className="tooltiptext">Data for population 25 years and over.</span>
            </td>
            {CensusDataColumns("educ_college", "%")}
          </tr>
          <tr className="last-of-type">
            <td className="tooltip">
              % w/Bachelor's Degree
              <span className="tooltiptext">Data for population 25 years and over. First reported in 1990.</span>
            </td>
            {CensusDataColumns("educ_bach", "%")}
          </tr>

          <tr>
            {width > 1000 && (
              <td rowSpan={2} className="type">
                Income
              </td>
            )}
            <td className="tooltip">
              {`Average Family${width <= 1000 ? " Income" : ""}`}
              <span className="tooltiptext">First reported in 1970.</span>
            </td>
            {CensusDataColumns("avg_fam_income", "$")}
          </tr>
          <tr className="last-of-type">
            <td className="tooltip">
              {`Median Family${width <= 1000 ? " Income" : ""}`}
              <span className="tooltiptext">1970 uses tracts from 2010, but with 1970 data. First reported in 1970.</span>
            </td>
            {CensusDataColumns("med_fam_income", "$")}
          </tr>

          <tr>
            {width > 1000 && (
              <td rowSpan={2} className="type">
                Jobs
              </td>
            )}
            <td className="tooltip">
              % in Service Industry
              <span className="tooltiptext">Data for population 16 years and over.</span>
            </td>
            {CensusDataColumns("jobs_service", "%")}
          </tr>
          <tr className="last-of-type">
            <td className="tooltip">
              % in Personal Service & Entertainment Industry
              <span className="tooltiptext">Data for population 16 years and over. “Personal Service” refers to workers in hotels, motels, laundering, cleaning, beauty & barber shops, dressmaking, shoe repair, and temporary parking services. Before 2000, restaurants and food service were not included in the data. In 2000 and 2010, they were included. First reported in 1970.</span>
            </td>
            {CensusDataColumns("jobs_pers_entmt", "%")}
          </tr>

          <tr>
            {width > 1000 && <td className="type">Housing</td>}
            <td>{`% Living in Rented${width <= 1000 ? " Housing" : ""}`}</td>
            {CensusDataColumns("rented_housing", "%")}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CensusTable;
