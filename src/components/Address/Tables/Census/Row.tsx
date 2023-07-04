import { useAppContext } from "../../../../hooks";
import * as Styled from "../Table/styled";
import * as Types from "./types.d";
import * as Constants from '../../../../constants';

const Row = ({ group, category, data, tooltip }: Types.Row) => {
  const { width } = useAppContext();
  if (width >= Constants.sizes.tablet) {
    return (
      <Styled.Row>
        {/* only display the group on laptop or larger */}
        {(group && width >= Constants.sizes.laptop) && (
          <Styled.RowHeader rowSpan={group.count}>
            {group.tooltip ? (
              <Styled.Tooltip as='span'>
                {group.label}
                <Styled.TooltipContent position="right">{group.tooltip}</Styled.TooltipContent>
              </Styled.Tooltip>
            ) : (
              <>{group.label}</>
            )}
          </Styled.RowHeader>
        )}
        <Styled.RowHeader colSpan={typeof group === "boolean" && !group && width >= Constants.sizes.laptop ? 2 : 1}>
          {tooltip ? (
            <Styled.Tooltip as='span'>
              {category}
              <Styled.TooltipContent position="right">{tooltip}</Styled.TooltipContent>
            </Styled.Tooltip>
          ) : (
            <>{category}</>
          )}
        </Styled.RowHeader>
        {data}
      </Styled.Row>
    );
  }
  return (
    <>
      <Styled.RowHeader colSpan={6}>
        {tooltip ? (
          <Styled.Tooltip as='span'>
            {category}
            <Styled.TooltipContent position="right">{tooltip}</Styled.TooltipContent>
          </Styled.Tooltip>
        ) : (
          <>{category}</>
        )}
      </Styled.RowHeader>
      <Styled.Row>{data}</Styled.Row>
    </>
  );
};

export default Row;
