import React from 'react';
import { useAddressData, useAppContext } from '../../../hooks';
import iconArrowLeft from "../../../assets/icons/icon-arrow-left.svg";
import iconArrowRight from "../../../assets/icons/icon-arrow-right.svg";
// import iconArrowDown from "../../assets/icons/icon-arrow-down.svg";
// import iconArrowUp from "../../assets/icons/icon-arrow-up.svg";
import * as Styled from './styled';
import { MoveLink } from '../../Panorama/Controls/styled';

const Controls = ({ show, setShow }: { show: 'photos' | 'context', setShow: React.Dispatch<React.SetStateAction<"photos" | "context">> }) => {
  const {
    previousAddress,
    nextAddress,
    oppositeAddress,
    addressData,
  } = useAddressData();
  const { media } = useAppContext();
  const side = addressData?.side;

  return (
    <Styled.Nav>
      {(oppositeAddress)
        ? (
          <MoveLink to={`../${oppositeAddress}`}>
              {(side === 's') ? 'Look North' : 'Look South'}
          </MoveLink>
        )
        : <span />
      }
      {(previousAddress)
        ? (
          <MoveLink to={`../${previousAddress}`} justifyself='right'>
              <img src={iconArrowLeft} alt="icon-arrow-left" /> {previousAddress}
          </MoveLink>
        )
        : <span />
      }
      {(nextAddress)
        ? (
          <MoveLink to={`../${nextAddress}`} justifyself='left'>
              {nextAddress} <img src={iconArrowRight} alt="icon-arrow-right" />
          </MoveLink>
        )
        : <span />
      }
      <Styled.ToggleButton
        onClick={() => {
          setShow((show === 'photos') ? 'context' : 'photos');
        }}
      >
        {(media !== 'phone') && 'Show '}
        {(show === 'photos') ? 'Historical Context' : 'Photographs'}
      </Styled.ToggleButton>
    </Styled.Nav>
  );
}

export default Controls;