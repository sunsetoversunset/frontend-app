import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button, { ButtonRight } from '../Styled/Button';
import { useAddressData } from '../../hooks';
import iconArrowLeft from "../../assets/icons/icon-arrow-left.svg";
import iconArrowRight from "../../assets/icons/icon-arrow-right.svg";
import iconArrowDown from "../../assets/icons/icon-arrow-down.svg";
import iconArrowUp from "../../assets/icons/icon-arrow-up.svg";

const Nav = styled.nav`
  position: sticky;
  top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 38px 400px;
  column-gap: 10px;
  row-gap: 10px;
  padding: 5px 20px;
  width: calc(100% - 40px);
  align-items: center;
  height: 40px;
  z-index: 1001;
  background-color: #F1EEE8;
  overflow: visible;


  .previous {
    justify-self: right;
  }

    .photos,
    .next {
    justify-self: left;
  }

  a,
    a: active,
      a:visited {
    font-weight: 400;
    text-decoration: none;
    padding: 0 10px;
    border: 1px solid transparent;
  }

  a,
    a:visited {
    color: $black;
  }
  a: focus,
    a:hover {
    outline: none;
    border: 1px solid $rust;
    border-radius: 50px;
  }
`;

const LinkRight = styled(Link)`
  justify-self: end;
`;

const Controls = ({ show, setShow }: { show: 'photos' | 'context', setShow: React.Dispatch<React.SetStateAction<"photos" | "context">> }) => {
  const {
    previousAddress,
    nextAddress,
    oppositeAddress,
    addressData,
  } = useAddressData();
  const side = addressData?.side;

  return (
    <Nav>
      {(oppositeAddress)
        ? (
          <Link to={`../${oppositeAddress}`}>
            <Button>
              {oppositeAddress} <img src={(side === 's') ? iconArrowDown : iconArrowUp} alt="north-south-arrow" />
            </Button>
          </Link>
        )
        : <span />
      }
      {(previousAddress)
        ? (
          <LinkRight to={`../${previousAddress}`}>
            <Button>
              <img src={iconArrowLeft} alt="icon-arrow-left" /> {previousAddress}
            </Button>
          </LinkRight>
        )
        : <span />
      }
      {(nextAddress)
        ? (
          <Link to={`../${nextAddress}`}>
            <Button>
              {nextAddress} <img src={iconArrowRight} alt="icon-arrow-right" />
            </Button>
          </Link>
        )
        : <span />
      }
      <ButtonRight
        onClick={() => {
          setShow((show === 'photos') ? 'context' : 'photos');
        }}
      >
        {(show === 'photos') ? 'Show Historical Profile' : 'Show Photographs'}
      </ButtonRight>
    </Nav>
  );
}

export default Controls;