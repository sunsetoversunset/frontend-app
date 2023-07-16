import * as Styled from "./styled";
import * as Types from "./types.d";

const Table = ({ title, sources, headers, rows }: Types.Table) => {
  const headersWithKeys = headers.map((header, idx) => {
    if (typeof header === "string" || typeof header === "number") {
      return {
        key: `${header}`,
        style: {}, 
        content: header
      };
    }
    if (typeof header === 'object' && "content" in header) {
      const { content } = header;
      if ("style" in content) {
        return {
          key: header.key,
          style: content.style,
          content: content.datum
        };
      } else {
        return {
          key: header.key,
          style: {},
          content,
        }
      }
    }
    return {
      key: `empty ${idx}`,
      style: {},
      content: null,
    }
  }); 

  return (
    <Styled.DataTable>
      <Styled.Caption>
        <Styled.Title>{title}</Styled.Title>
        {sources && (
          <Styled.Tooltip>
            Sources
            <Styled.TooltipContent>{sources}</Styled.TooltipContent>
          </Styled.Tooltip>
        )}
      </Styled.Caption>

      <thead>
        <Styled.Row>
          {headersWithKeys.map((header) => (
            <Styled.TableHeader
              key={header.key}
              styling={header.style}
            >
              {header.content}
            </Styled.TableHeader>
          ))}
        </Styled.Row>
      </thead>

      <tbody>
        {rows.map((row) => (
          <Styled.Row key={row.key}>{row.data.map((data, idx) => (data && typeof data === "object" && "style" in data ? <Styled.Data styling={data.style} key={idx}>{data.datum}</Styled.Data> : <Styled.Data key={idx}>{data}</Styled.Data>))}</Styled.Row>
        ))}
      </tbody>
    </Styled.DataTable>
  );
};

export default Table;
