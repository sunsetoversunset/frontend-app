import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { media, modalActive } = useAppContext();
  const side = addressData?.side;

  useEffect(() => {
    // move left or right using arrow keys if the modal isn't active
    const handleArrowKeysPressed = ((e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate(`../${previousAddress}`, { replace: true });
      }
      if (e.key === 'ArrowRight') {
        navigate(`../${nextAddress}`, { replace: true });
      }
    });

        // only adjust map if the modal isn't open. The modal uses left/right arrow keys too to navigate.
        if (!modalActive) {
          window.addEventListener('keydown', handleArrowKeysPressed);
        } else {
          window.removeEventListener('keydown', handleArrowKeysPressed);
        }
        return () => {
          window.removeEventListener('keydown', handleArrowKeysPressed);
        }
      }, [modalActive, nextAddress, previousAddress, navigate]);

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
        {(show === 'photos') ? `${(media == 'phone') ? '' : 'Show '}Historical Context` : `${(media == 'phone') ? '' : 'Show '}Photographs`}
      </Styled.ToggleButton>
    </Styled.Nav>
  );
}

export default Controls;