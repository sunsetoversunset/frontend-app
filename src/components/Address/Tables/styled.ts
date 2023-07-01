import styled from 'styled-components';
import * as Constants from '../../../constants';

export const Title = styled.h1`
    font-size: 22px;
    font-weight: 400;
    line-height: 30.8px;
    margin: 14px 10px 10px !important;
    display: inline-block;
`;

export const Data = styled.td<{textAlign?: 'right' | 'center' | 'left'}>`
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  padding: 10px 3px;
  text-align: ${p => (p.textAlign) ? p.textAlign : 'right'};
  max-width: 400px;

  &:last-of-type {
    border-right: 1px solid transparent;
  }


  @media (min-width: 700px) {
    padding: 11px 10px 11px 6px;
  }
  
  @media (min-width: 1000px) {
    padding: 12px 15px 13px 20px;
  }

  border-left: 0px;
  font-weight: 600;
  line-height: 19px;
`;

export const TableHeader = styled.th`
  text-align: left;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    padding: 10px 3px;
    max-width: 400px;
    background-color: white;

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
`


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
  margin: 14px 20px 10px;
  float: right;
  text-align: right;

  &:hover ${TooltipContent} {
    visibility: visible;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-weight: 400;
  line-height: 19px;
  font-size: 16px;
`;

export const Row = styled.tr`
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;

  &:last-of-type {
    border-bottom: 1px solid transparent;
  }
`;

export const DataTable = styled.div`
  border: 1px solid #000;
  border-radius: 16px;
  background-color: #fefbf5;
  display: inline-block;
  text-align: left;

  thead tr:last-of-type {
    border-bottom: 1px solid #dedede !important;
  }
`;