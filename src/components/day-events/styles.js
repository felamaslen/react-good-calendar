import styled from 'styled-components';
import { readableColor } from 'polished';

import { rem } from '../../mixins';
import { LEFT_BOUNDARY, RIGHT_BOUNDARY, SINGLE_DAY } from '../../modules/time';

const getEventHeight = (offset = 0) => ({ theme: { eventFontSize } }) => (
  rem(eventFontSize * (1 + offset))
);

export const DayEvent = styled.h3`
  margin: 0 0 ${({ theme: { eventMargin } }) => rem(eventMargin)};
  padding: 0 ${({ theme: { eventPadding } }) => rem(eventPadding)};
  box-sizing: border-box;
  height: ${getEventHeight(0.5)};
  line-height: ${getEventHeight(0.8)};
  font-size: ${getEventHeight()};
  background-color: ${({ color }) => color};
  color: ${({ color, allDay, inDay }) => {
    if (allDay && ![LEFT_BOUNDARY, SINGLE_DAY].includes(inDay)) {
      return 'transparent';
    }

    return readableColor(color);
  }};

  ${({
    allDay,
    inDay,
    theme: { eventMargin, eventPadding },
  }) => {
    if (!allDay) {
      return '';
    }
    if (inDay === SINGLE_DAY) {
      return `
        margin: 0 ${rem(eventMargin)} ${rem(eventMargin)} ${rem(eventMargin)};
        border-radius: ${rem(eventPadding)};
      `;
    }
    if (inDay === LEFT_BOUNDARY) {
      return `
        margin-left: ${rem(eventMargin)};
        border-radius: ${rem(eventPadding)} 0 0 ${rem(eventPadding)};
      `;
    }
    if (inDay === RIGHT_BOUNDARY) {
      return `
        margin-right: ${rem(eventMargin)};
        border-radius: 0 ${rem(eventPadding)} ${rem(eventPadding)} 0;
      `;
    }

    return '';
  }}
`;
