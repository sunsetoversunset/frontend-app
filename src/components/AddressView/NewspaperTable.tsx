import { useContext } from 'react';
import ConditionalWrapper from '../ConditionalWrapper';
import { AddressDataContext } from '../../Contexts';
import { AddressData } from '../../types/AddressView.d';
import '../../styles/Tables.scss';

const NewspaperTable = () => {
  const { newspaper_data } = useContext(AddressDataContext) as AddressData;
  if (newspaper_data.length === 0) {
    return null;
  }

  return (
    <div
      className={"newspaperTable dataTable "}
    >
      <h1>Newspaper Articles</h1>
      <table>
        <thead>
          <tr className="year">
            <th>Date</th>
            <th>Title</th>
            <th>Publication</th>
            <th>Article</th>
          </tr>
        </thead>

        <tbody>
          {newspaper_data
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
            .map((article) => (
              <tr key={`${article.date.month}/${article.date.day}/${article.date.year}-${article.title}`}>
                <td>{`${article.date.month}/${article.date.day}/${article.date.year}`}</td>
                <td>
                  <ConditionalWrapper
                  condition={!!article.url}
                  wrapper={(children: any) => (<a href={article.url}>{children}</a>)}
                  children={
                    <>"{article.title}"</>
                  }
                />
                </td>
                <td><cite>{article.source}</cite></td>
                <td>{article.entry}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewspaperTable;