import styled from 'styled-components';

export const Strip = styled.ul<{count: number}>`
  list-style: none;
  display: flex;
  align-items: flex-start;
  max-width: 100vw;
  padding: 0;
  margin: 40px 0;
  
  li {
    max-width: calc(100vw / ${p => p.count});
  }

  img {
    width: calc(100vw / ${p => p.count});
  }
`;