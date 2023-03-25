import styled from 'styled-components';
import { colors } from '../../utiliities';

const { light2, black, medOrange } = colors;

const Button = styled.button`
    font-size: 14px;
    border-radius: 50px;
    background: ${light2};
    padding: 0px 24px;
    height: 36px;
    border: 1px solid ${black};
    display: flex;
    gap: 4px;
    align-items: center;
    font-family: "Sunset-Gothic", sans-serif;
    font-weight: 500;
    white-space: nowrap;

    &.disabled {
      color: silver;
      pointer-events: none;
    }

    &:hover {
      cursor: pointer;
      background-color: ${medOrange};
    }
`;

export const ButtonRight = styled(Button)`
    justify-self: end;
`;

export default Button;