import React, { memo } from 'react';
import PropTypes from 'prop-types';
import getDate from 'date-fns/getDate';

import * as Styled from './styles';

const Day = ({
  day,
  isToday,
  isPast,
  isFuture,
}) => (
  <Styled.Day isToday={isToday} isPast={isPast} isFuture={isFuture}>
    <Styled.DayTitle>{getDate(day)}</Styled.DayTitle>
  </Styled.Day>
);

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  isToday: PropTypes.bool.isRequired,
  isPast: PropTypes.bool.isRequired,
  isFuture: PropTypes.bool.isRequired,
};

export default memo(Day);
