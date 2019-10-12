import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column;

  &,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
