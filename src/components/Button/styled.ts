import styled from 'styled-components';
import * as Constants from '../../constants';

export const RoundedButton = styled.button<{ inactive?: boolean; }>`
  font-size: 14px;
  border-radius: 50px;
  background: ${Constants.colors.light2};
  padding: 0px 24px;
  height: 36px;
  border: 1px solid ${Constants.colors.black};
  display: flex;
	align-items: center;
	column-gap: 4px;
  font-family: "Sunset-Gothic", sans-serif;
  font-weight: 500;
`;
