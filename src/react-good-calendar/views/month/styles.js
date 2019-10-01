import styled from 'styled-components';

import { rem } from '../../mixins';

export const Main = styled.div`
display: flex;
flex-flow: column;
width: 100%;
height: 100%;
border: 1px solid ${({ theme: { borderColor } }) => borderColor};
`;

export const Week = styled.div`
display: flex;
flex: 0 0 ${({ theme: { weekHeight } }) => rem(weekHeight)};
:not(:last-child) {
  border-bottom: 1px solid ${({ theme: { borderColor } }) => borderColor};
}
`;

export const Day = styled.div`
display: flex;
flex-flow: column;
flex: 1;
position: relative;
:not(:last-child) {
  border-right: 1px solid ${({ theme: { borderColor } }) => borderColor};
}
`;

export const DayTitle = styled.h3`
margin: ${rem(3)} 0;
font-size: ${rem(12)};
text-align: left;
`;
