import { useContext } from 'react';
import { AddressDataContext } from '../../Contexts';
import { CensusField, DecadeIndex, AddressData } from '../../types/AddressView.d';
import '../../styles/Tables.scss';

const CensusTable = () => {
  const { census_data } = useContext(AddressDataContext) as AddressData;
  const CensusDataColumns = (key: CensusField, unit: '%' | '$' | 'number') => {
    const format = (unit: '%' | '$' | 'number', value: number | string | undefined) => {
      if (value === undefined) {
        return <span className='no_data'>no data</span>;
      }
      if (unit === '%' && typeof value === 'number') {
        return `${Math.round(value * 10000) / 100}%`;
      }
      if (unit === '$' && typeof value === 'number') {
        return `$${value.toLocaleString()}`;
      }
      if (unit === 'number' && typeof value === 'number') {
        return value.toLocaleString();
      }
      return value;
    }
    return (
      <>
        {([1960, 1970, 1980, 1990, 2000, 2010].map(decade => (
          <td className='value' key={`${key}${decade}`}>{format(unit, census_data[key][decade as DecadeIndex])}</td>
        )))}
      </>
    );
  };
  return (
    <div
      className={"censusTable dataTable "}
    >
      <h1>Census</h1>
      <table>
        <thead>
          <tr className='year'>
            {[1960, 1970, 1980, 1990, 2000, 2010].map(decade => (
              <th
                colSpan={(decade === 1960) ? 3 : 1}
                key={`censusTableHeaderFor${decade}`}
              >
                {decade}
                <br />
                <span className='deemphasize'>{`Tract ${census_data.tracts[decade as DecadeIndex]}`}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className='last-of-type'>
            <td colSpan={2}>Total Population</td>
            {CensusDataColumns('total_pop', 'number')}
          </tr>
          <tr>
            <td rowSpan={3} className='type'>Race</td>
            <td>% White</td>
            {CensusDataColumns('race_white', '%')}
          </tr>
          <tr>
            <td>% Black</td>
            {CensusDataColumns('race_black', '%')}
          </tr>
          <tr className='last-of-type'>
            <td>% Spanish / Hispanic</td>
            {CensusDataColumns('race_span_hisp', '%')}
          </tr>

          <tr>
            <td rowSpan={3} className='type'>Foreign-born</td>
            <td>% Total</td>
            {CensusDataColumns('foreign_born_pop', '%')}
          </tr>
          <tr>
            <td>% Noncitizen</td>
            {CensusDataColumns('foreign_noncitizens', '%')}
          </tr>
          <tr className='last-of-type'>
            <td>% Naturalized Citizen</td>
            {CensusDataColumns('foreign_naturalized', '%')}
          </tr>

          <tr>
            <td rowSpan={3} className='type'>Education</td>
            <td>% w/High School</td>
            {CensusDataColumns('educ_hs', '%')}
          </tr>
          <tr>
            <td>% w/College</td>
            {CensusDataColumns('educ_college', '%')}
          </tr>
          <tr className='last-of-type'>
            <td>% w/Bachelor's Degree</td>
            {CensusDataColumns('educ_bach', '%')}
          </tr>

          <tr>
            <td rowSpan={2} className='type'>Income</td>
            <td>Average Family</td>
            {CensusDataColumns('avg_fam_income', '$')}
          </tr>
          <tr className='last-of-type'>
            <td>Median Family</td>
            {CensusDataColumns('med_fam_income', '$')}
          </tr>

          <tr>
            <td rowSpan={2} className='type'>Jobs</td>
            <td>% in Service Industry</td>
            {CensusDataColumns('jobs_service', '%')}
          </tr>
          <tr className='last-of-type'>
            <td>% in Personal Service & Entertainment Industry</td>
            {CensusDataColumns('jobs_pers_entmt', '%')}
          </tr>

          <tr>
            <td className='type'>Housing</td>
            <td>% Living in Rented</td>
            {CensusDataColumns('rented_housing', '%')}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CensusTable;;