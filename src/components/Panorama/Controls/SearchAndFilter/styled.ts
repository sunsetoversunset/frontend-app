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

/* adapted from https://moderncss.dev/pure-css-custom-checkbox-style/ */
export const Checkbox = styled.input<{checked: boolean}>`
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(${Constants.colors.mainBg});
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid black;
  border-radius: 0.35em;
  transform: translateY(-0.075em);
  background-color: ${p => p.checked ? Constants.colors.medOrange : 'transparent'};

  display: inline-grid;
  place-content: center;
  margin-right: 5px;

  ::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    /* Windows High Contrast Mode */
    background-color: white;
  }

  &:checked::before {
    transform: scale(1);
  }
`;