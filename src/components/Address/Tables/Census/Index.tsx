import { useState } from 'react';
import { useAddressDataContext, useAppContext } from "../../../../hooks";
import { CensusField, DecadeIndex } from "../../../../types/AddressView";
import Row from "./Row";
import * as Styled from "../Table/styled";
import * as Constants from '../../../../constants';

const CensusTable = () => {
  const { census_data } = useAddressDataContext();
  const { width } = useAppContext();
  const [adjustForInflation, setAdjustForInflation] = useState(false);

  const inflationAdjustments = [
    {
      year: 1960,
      multiplier: 9.89,
    },
    {
      year: 1970,
      multiplier: 7.54,
    },
    {
      year: 1980,
      multiplier: 3.55,
    },
    {
      year: 1990,
      multiplier: 2.24,
    },
    {
      year: 2000,
      multiplier: 1.7,
    },
    {
      year: 2010,
      multiplier: 1.34,
    }
  ];

  const CensusDataColumns = (key: CensusField, unit: "%" | "$" | "number") => {
    const format = (unit: "%" | "$" | "number", value: number | string | undefined) => {
      if (value === undefined) {
        return <span className="no_data">no data</span>;
      }
      if (unit === "%" && typeof value === "number") {
        return `${Math.round(value * 10000) / 100}%`;
      }
      if (unit === "$" && typeof value === "number") {
        return `$${Math.round(value / 100) / 10}K`;
        // if (width < Constants.sizes.laptop && value >= 1000) {
        // }
        // return `$${value.toLocaleString()}`;
      }
      if (unit === "number" && typeof value === "number") {
        return value.toLocaleString();
      }
      return value;
    };
    return (
      <>
        {[1960, 1970, 1980, 1990, 2000, 2010].map((decade) => {
          const value = ((key === 'med_fam_income' || key === 'avg_fam_income') && census_data[key][decade as DecadeIndex] && adjustForInflation) ? Math.round(census_data[key][decade as DecadeIndex] as number * (inflationAdjustments.find(d => d.year === decade) as { year: number;  multiplier: number }).multiplier) : census_data[key][decade as DecadeIndex];
          if (census_data[key] && value) {
            return (
              <Styled.Data key={`${key}${decade}`} styling={{ text_align: "right" }}>
                {format(unit, value)}
              </Styled.Data>
            );
          } else {
            return <Styled.Data key={`${key}${decade}`}></Styled.Data>;
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
    <Styled.DataTable>
      <Styled.Caption>
        <Styled.Title>Census</Styled.Title>
        <Styled.Tooltip>
          Sources
          <Styled.TooltipContent>
            U.S. Bureau of the Census, <cite>Census of Population and Housing, 1960-2010</cite>, accessed via{" "}
            <a href="https://www.socialexplorer.com/" target="_blank" rel="noreferrer">
              Social Explorer
            </a>{" "}
            and{" "}
            <a href="https://www.nhgis.org/" target="_blank" rel="noreferrer">
              IPUMS National Historical Geographic Information System (NHGIS)
            </a>
            .
          </Styled.TooltipContent>
        </Styled.Tooltip>
      </Styled.Caption>
      <thead>
        <Styled.Row>
          {(width >= Constants.sizes.tablet && width < Constants.sizes.laptop) && <Styled.EmptyTableHeader />}
          {(width >= Constants.sizes.laptop) && <Styled.EmptyTableHeader colSpan={2} />}
          
          
          {[1960, 1970, 1980, 1990, 2000, 2010].map((decade) => (
            <Styled.TableHeader key={`censusTableHeaderFor${decade}`}>
              {decade}
              <br />
              <Styled.Deemphasize>{`Tract ${census_data.tracts[decade as DecadeIndex]}`}</Styled.Deemphasize>
            </Styled.TableHeader>
          ))}
        </Styled.Row>
      </thead>

      <tbody>
        <Row
          group={false}
          category="Total Population"
          data={CensusDataColumns("total_pop", "number")}
        />

        <Row
          group={{
            label: "RACE",
            count: 3,
          }}
          category="% White"
          data={CensusDataColumns("race_white", "%")}
        />
        <Row
          category="% Black"
          data={CensusDataColumns("race_black", "%")}
        />
        <Row
          category="% Spanish / Hispanic"
          data={CensusDataColumns("race_span_hisp", "%")}
          tooltip='1960 displays persons with Puerto Rican or Spanish surnames. 1970 and 1980 display persons with Spanish origin or descent. 1990 and onwards display Hispanic and Latino persons.'
        />

        <Row
          group={{
            label: 'FOREIGN-BORN',
            count: 3,
            tooltip: 'First reported in 1970',
          }}
          category={width >= Constants.sizes.laptop ? "% Total" : "% Foreign Born"}
          data={CensusDataColumns("foreign_born_pop", "%")}
        />
        <Row
          category="% Noncitizen"
          data={CensusDataColumns("foreign_noncitizens", "%")}
        />
        <Row
          category="% Naturalized Citizen"
          data={CensusDataColumns("foreign_naturalized", "%")}
        />

        <Row
          group={{
            label: 'EDUCATION',
            count: 3,
          }}
          category="% w/High School"
          tooltip="Data for population 25 years and over. Before 1990, data display persons who attended high school. Data for 1990 and onwards display persons who have graduated with a high school diploma."
          data={CensusDataColumns("educ_hs", "%")}
        />
        <Row
          category='% w/College'
          tooltip="Data for population 25 years and over."
          data={CensusDataColumns("educ_college", "%")}
        />
        <Row
          category="% w/Bachelor's Degree"
          tooltip="Data for population 25 years and over. First reported in 1990."
          data={CensusDataColumns("educ_bach", "%")}
        />

        <Row
          group={{
            label: "INCOME",
            count: 2,
            toggle: {
              func: setAdjustForInflation,
              value: adjustForInflation,
              labelTrue: 'show as original census $',
              labelFalse: 'show as inflation-adjusted 2022 $'
            }
          }}
          category={`Average Family${width < Constants.sizes.laptop ? " Income" : ""}`}
          tooltip="First reported in 1970."
          data={CensusDataColumns("avg_fam_income", "$")}
        />
        <Row
          category={`Median Family${width < Constants.sizes.laptop ? " Income" : ""}`}
          tooltip="1970 uses tracts from 2010, but with 1970 data. First reported in 1970."
          data={CensusDataColumns("med_fam_income", "$")}
        />

        <Row
          group={{
            label: "JOBS",
            count: 2,
          }}
          category="% in Service Industry"
          tooltip="Data for population 16 years and over."
          data={CensusDataColumns("jobs_service", "%")}
        />
        <Row
          category="% in Personal Service & Entertainment Industry"
          tooltip="Data for population 16 years and over. “Personal Service” refers to workers in hotels, motels, laundering, cleaning, beauty & barber shops, dressmaking, shoe repair, and temporary parking services. Before 2000, restaurants and food service were not included in the data. In 2000 and 2010, they were included. First reported in 1970."
          data={CensusDataColumns("jobs_pers_entmt", "%")}
        />

        <Row
          group={{
            label: "HOUSING",
            count: 1,
          }}
          category={`% Living in Rented${width <= 1000 ? " Housing" : ""}`}
          data={CensusDataColumns("rented_housing", "%")}
        />
      </tbody>
    </Styled.DataTable>
  );
};

export default CensusTable;
