import styled from 'styled-components';

export const Landing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(200, 200, 200, 0.5);
  z-index: 10000;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  font-size: 1.2em;
  line-height: 1.5;
  width: 500px;
  max-width: calc(90vw - 40px);
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;

  span {
    text-decoration: underline;
    font-weight: 700;
    color: #E95414;

    &:hover {
      color: #AD3400;
    }
  }


  button {
    margin: 10px auto;
  }
`;

export const DontShow = styled.div`
  font-size: 0.9em;
  text-align: right;
`;