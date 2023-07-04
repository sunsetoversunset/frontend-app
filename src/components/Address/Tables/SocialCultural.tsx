import { useAddressDataContext } from "../../../hooks";
import ConditionalWrapper from "../../ConditionalWrapper";
import Table from "./Table/Index";

const SocialCulturalTable = () => {
  const { social_cultural_data } = useAddressDataContext();
  if (social_cultural_data.length === 0) {
    return null;
  }

  const rows = social_cultural_data
    .sort((a, b) => {
      const aYear = a.source_date || a.building_date;
      const bYear = b.source_date || b.building_date;
      if (aYear !== bYear) {
        return aYear - bYear;
      }
      return 0;
    })
    .map((resource) => ({
      key: `${resource.source_date || resource.building_date}-${resource.entry}-${resource.source}`,
      data: [
        resource.source_date || resource.building_date,
        resource.data_type,
        <ConditionalWrapper
          condition={!!resource.url}
          wrapper={(children: any) => (
            <a href={resource.url} target="_blank">
              {children}
            </a>
          )}
          children={<>"{resource.entry}"</>}
        />,
        <cite>{resource.source}</cite>
    ]  
  }));

  return <Table title="Social and Cultural Resources" headers={["Date", "Type", "Resource", "Source"]} rows={rows} />;;
};

export default SocialCulturalTable;
