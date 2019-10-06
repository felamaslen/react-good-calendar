import styled from 'styled-components';
import { rem } from '../mixins';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  margin: ${rem(16)} ${rem(8)};
`;

export const Title = styled.h2`
  margin: ${rem(16)} 0;
  flex: 1;
`;
