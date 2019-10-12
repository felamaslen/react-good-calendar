import styled from 'styled-components';

import { rem } from '../../mixins';

import { DayEvent } from '../../components/day-events/styles';

export const Main = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme: { borderColor } }) => borderColor};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: ${rem(32)};
  border-bottom: 1px solid ${({ theme: { borderColor } }) => borderColor};
`;

export const DayOfWeek = styled.div`
  flex: 1;
  text-transform: capitalize;
  text-align: center;
  font-size: ${rem(16)};
  font-weight: bold;
`;

export const Week = styled.div`
  display: flex;
  flex: 0 0 ${({ theme: { weekHeight } }) => rem(weekHeight)};
  :not(:last-child) {
    border-bottom: 1px solid ${({ theme: { borderColor } }) => borderColor};
  }
`;

export const DayBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background: ${({
    theme: {
      inactiveColor = '#eee',
      todayColor = '#eef',
      activeColor = 'none',
    },
    isPast,
    isFuture,
    isToday
  }) => {
    if (isToday) {
      return todayColor;
    }
    if (isPast || isFuture) {
      return inactiveColor;
    }

    return activeColor;
  }};
`;

export const Day = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  position: relative;

  ${DayEvent} {
    z-index: 2;
  }

  :not(:last-child) {
    ${DayBackground} {
      border-right: 1px solid ${({ theme: { borderColor } }) => borderColor};
    }
  }
`;

export const DayTitle = styled.h3`
  margin: ${rem(3)} ${({ theme: { eventMargin } }) => rem(eventMargin)};
  font-size: ${rem(12)};
  text-align: left;
`;
