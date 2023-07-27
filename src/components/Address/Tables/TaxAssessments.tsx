import { useAddressDataContext } from "../../../hooks";
import * as Styled from "./Table/styled";

const TaxAssessments = () => {
  const { assessor_data } = useAddressDataContext();
  if (assessor_data.length === 0) {
    return null;
  }

  return (
    <Styled.DataTable>
      <Styled.Caption>
        <Styled.Title>Tax Assessments</Styled.Title>
      </Styled.Caption>
        <tbody>
          {assessor_data.map((resource) => (
            <tr key={resource.AIN}>
              <td
                style={{
                  padding: '5px 20px',
                }}
              >
                <a href={`https://portal.assessor.lacounty.gov/parceldetail/${resource.AIN}`} target="_blank" rel="noreferrer">
                  {resource.SitusAddress}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
    </Styled.DataTable>
  );
};

export default TaxAssessments;
