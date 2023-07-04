import { useAddressDataContext } from "../../../hooks";
import ConditionalWrapper from "../../ConditionalWrapper";
import Table from "./Table/Index";

const NewspaperTable = () => {
  const { newspaper_data } = useAddressDataContext();
  if (newspaper_data.length === 0) {
    return null;
  }

  const sources = (
    <span>
      <cite>Los Angeles Times</cite> and <cite>Los Angeles Sentinel</cite>, accessed via{" "}
      <a href="https://about.proquest.com/en/products-services/pq-hist-news/" target="_blank" rel="noreferrer">
        ProQuest Historical Newspapers
      </a>
      ; <cite>Ethnic Newswatch</cite> and <cite>GenderWatch</cite>, accessed via ProQuest; <cite>La Opinión</cite>, accessed via{" "}
      <a href="https://news.google.com/" target="_blank" rel="noreferrer">
        Google News
      </a>
      .
    </span>
  );

  const rows = newspaper_data
    .sort((a, b) => {
      if (a.date.year !== b.date.year) {
        return a.date.year - b.date.year;
      }
      if (a.date.month !== b.date.month) {
        return a.date.month - b.date.month;
      }
      if (a.date.day !== b.date.day) {
        return a.date.day - b.date.day;
      }
      return 0;
    })
    .map((article) => ({
      key: `${article.date.month}/${article.date.day}/${article.date.year}-${article.title}`,
      data: [
        `${article.date.month}/${article.date.day}/${article.date.year}`,
        <ConditionalWrapper
          condition={!!article.url}
          wrapper={(children: any) => (
            <a href={article.url} target="_blank" rel="noreferrer">
              {children}
            </a>
          )}
          children={<>"{article.title}"</>}
        />,
        <cite>{article.source}</cite>,
        article.entry,
      ],
    }));

  return <Table title="Newspaper Articles" sources={sources} headers={["Date", "Title", "Publication", "Article"]} rows={rows} />;
};

export default NewspaperTable;
