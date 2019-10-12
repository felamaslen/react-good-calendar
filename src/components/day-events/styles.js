import styled from 'styled-components';
import { readableColor } from 'polished';

import { rem } from '../../mixins';

const getEventHeight = (offset = 0) => ({ theme: { eventFontSize = 12 } }) => (
  rem(eventFontSize * (1 + offset))
);

export const DayEvent = styled.h3`
  margin: 0;
  padding: 0 ${rem(2)};
  height: ${getEventHeight(0.5)};
  line-height: ${getEventHeight(0.8)};
  font-size: ${getEventHeight()};
  background-color: ${({ color }) => color};
  color: ${({ color }) => readableColor(color)};
`;
