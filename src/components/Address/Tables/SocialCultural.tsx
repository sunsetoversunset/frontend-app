import ConditionalWrapper from '../../ConditionalWrapper';
import { useAddressDataContext } from '../../../hooks';
import '../../../styles/Tables.scss';

const SocialCulturalTable = () => {
  const { social_cultural_data } = useAddressDataContext();
  if (social_cultural_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"socialCulturalTable dataTable"}
    >
      <h1>Social and Cultural Resources</h1>
      <table>
        <thead>
          <tr className="year">
            <th>Date</th>
            <th>Type</th>
            <th>Resource</th>
            <th>Source</th>
          </tr>
        </thead>

        <tbody>
          {social_cultural_data
            .sort((a, b) => {
              const aYear = a.source_date || a.building_date;
              const bYear = b.source_date || b.building_date;
              if (aYear !== bYear) {
                return aYear - bYear;
              }
              return 0;
            })
            .map((resource) => (
              <tr key={`${resource.source_date || resource.building_date}-${resource.entry}-${resource.source}`}>
                <td>{resource.source_date || resource.building_date}</td>
                <td>{resource.data_type}</td>
                <td>
                  <ConditionalWrapper
                  condition={!!resource.url}
                  wrapper={(children: any) => (<a href={resource.url} target='_blank'>{children}</a>)}
                  children={
                    <>"{resource.entry}"</>
                  }
                />
                </td>
                <td><cite>{resource.source}</cite></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SocialCulturalTable;