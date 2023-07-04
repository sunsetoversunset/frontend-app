import styled from "styled-components";
import * as Constants from "../../../constants";

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

  thead tr:last-of-type {
    border-bottom: 1px solid #dedede !important;
  }
`;

export const Title = styled.caption`
  font-size: 22px;
  font-weight: 400;
  line-height: 30.8px;
  margin: 14px 10px 10px !important;
  display: inline-block;
  width: calc(100% - 34px);
  text-align: left;
`;

export const Row = styled.tr`
  border-top: 1px solid #dedede;

  /* &:last-of-type {
    border-bottom: 1px solid transparent;
  } */
`;

export const TableHeader = styled.th`
  text-align: left;
  border-right: 1px solid #dedede;
  padding: 10px 3px;
  max-width: 400px;
  background-color: white;
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



export const Data = styled(TableHeader)<{ textAlign?: "right" | "center" | "left" }>`
  text-align: ${(p) => p.textAlign || "right"};
  font-weight: 600;
  background-color: inherit;

  &:last-of-type {
    border-right: 1px solid transparent;
  }
`;

export const TooltipContent = styled.span`
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
  left: 105%;
  z-index: 1;
  width: 250px;
  right: 105%;
  left: auto;

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
  position: relative;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 400;
  line-height: 30.8px;
  margin: 0px 5px 10px 20px;
  float: right;
  text-align: right;

  &:hover ${TooltipContent} {
    visibility: visible;
  }
`;

export const Table = styled.table``;
