import styled from "styled-components";
import * as Constants from "../../../../constants";
import * as Types from './types.d';

export const DataTable = styled.table`
  border: 1px solid #000;
  border-radius: 16px;
  background-color: #fefbf5;
  display: inline-block;
  text-align: left;
  border-collapse: collapse;
  font-weight: 400;
  line-height: 19px;
  font-size: 16px;
  max-width: 95%;

  thead tr:last-of-type {
    border-bottom: 1px solid #dedede !important;
  }
`;

export const Caption = styled.caption`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: calc(100% - 20px);
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 400;
  line-height: 30.8px;
  display: inline-block;
  width: calc(100% - 34px);
  margin-left: 10px !important;
  text-align: left;
`;

export const TooltipContent = styled.span<{position?: 'left' | 'right'}>`
  visibility: hidden;
  width: 180px;
  background-color: black;
  color: #fff;
  padding: 5px;
  border-radius: 6px;
  text-align: left;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  top: -5px;
  z-index: 1;
  width: 250px;
  right: ${(p) => (p.position === 'right') ? 'auto' : '105%' };
  left: ${(p) => (p.position === 'right') ? '15%' : 'auto' };

  a {
    color: silver;
  }

  ul {
    margin-left: 20px;
    li {
      text-align: left;
      list-style: circle;
    }
  }
`;

export const Tooltip = styled.h4`
  display: inline-block;
  position: relative;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 400;
  text-align: left;

  &:hover ${TooltipContent} {
    visibility: visible;
  }
`;

export const Row = styled.tr`
  border-top: 1px solid #dedede;

  /* &:last-of-type {
    border-bottom: 1px solid transparent;
  } */
`;

export const TableHeader = styled.th<{ styling?: Types.CellStyling }>`
  text-align: center;
  border-right: 1px solid ${(p) => p.styling?.border_color || "#dedede"};
  padding: 10px 3px;
  max-width: 400px;
  background-color: ${(p) => p.styling?.background_color || "white"};
  line-height: 19px;

  @media (min-width: 700px) {
    padding: 11px 10px 11px 6px;
  }

  @media (min-width: 1000px) {
    padding: 12px 15px 13px 20px;
  }
`;

export const EmptyTableHeader = styled(TableHeader)`
  border-bottom: 1px solid transparent !important;
  background-color: ${Constants.colors.light1} !important;
`;

export const Data = styled(TableHeader)`
  text-align: ${(p) => p.styling?.text_align || "left"};
  font-weight: ${(p) => p.styling?.weight || 400};
  background-color: inherit;

  a {
    color: inherit;
  }

  &:last-of-type {
    border-right: none;
  }
`;

export const RowHeader = styled(Data)`
  text-align: left;
  font-weight: 600;
  background-color: inherit;
  background-color: #dedede;
  padding: 1px 0 1px 5px;

  ${Tooltip} {
    font-weight: inherit;
  }

  @media ${Constants.devices.tablet} {
    text-align: right;
    background-color: inherit;
    padding: 10px 3px;
  }
`;

export const Deemphasize = styled.span`
  color: #999;
  font-size: 0.75em;
  font-weight: normal;

  display: none;

  @media ${Constants.devices.tablet} {
    display: block;
  }
`;

