import { useAddressDataContext } from '../../../hooks';
import '../../../styles/Tables.scss';

const BuildingRecordsTable = () => {
  const { assessor_data } = useAddressDataContext();
  if (assessor_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"buildingRecordsTable dataTable"}
    >
      <h1>Online Building Records</h1>
      <table>
        <tbody>
          {assessor_data
            .map((resource) => (
              <tr key={resource.AIN}>
                <td>
                  <a
                    href={`https://portal.assessor.lacounty.gov/parceldetail/${resource.AIN}`}
                    target="_blank"
                  >
                    {resource.SitusAddress}  
                  </a> 
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingRecordsTable;