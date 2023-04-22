import styled from 'styled-components';
import * as Constants from '../../../../constants';

export const SearchAndFilter = styled.div`
  width: min(315px, 90vw);
  background: ${Constants.colors.light1};
  border: 1px solid ${Constants.colors.black};
  border-radius: 36px;
  position: relative;
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  justify-self: end;
`;

export const YearsControl = styled.div`
  padding: 16px 20px 28px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const YearControl = styled.form`
  margin-top: 8px;

`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 0;
`;

export const AddressSearch = styled.div`
  width: calc(100% - 40px);
  padding-left: 20px;
  margin-top: 45px;
`;

export const YearsHeader = styled.h3`
  margin: 20px 0 0 0;
`;

export const Checkbox = styled.input`
  background-color: ${Constants.colors.rust}
`;