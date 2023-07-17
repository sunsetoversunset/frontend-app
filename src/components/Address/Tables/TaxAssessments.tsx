import { useAddressDataContext } from '../../../hooks';
// import '../../../styles/Tables.scss';
//import '../../../styles/Tables.scss';

const TaxAssessments = () => {
  const { assessor_data } = useAddressDataContext();
  if (assessor_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"taxAssessments dataTable"}
    >
      <h1>Tax Assessments</h1>
      <table>
        <tbody>
          {assessor_data
            .map((resource) => (
              <tr key={resource.AIN}>
                <td>
                  <a
                    href={`https://portal.assessor.lacounty.gov/parceldetail/${resource.AIN}`}
                    target="_blank" rel="noreferrer"
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

export default TaxAssessments;