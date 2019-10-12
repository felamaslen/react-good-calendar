import React, { memo } from 'react';
import PropTypes from 'prop-types';
import getDate from 'date-fns/getDate';

import DayEvents from '../../components/day-events';
import * as Styled from './styles';

function Day({
  day,
  isToday,
  isPast,
  isFuture,
}) {
  return (
    <Styled.Day isToday={isToday} isPast={isPast} isFuture={isFuture}>
      <Styled.DayBackground />
      <Styled.DayTitle>{getDate(day)}</Styled.DayTitle>
      <DayEvents day={day} allDay />
    </Styled.Day>
  );
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  isToday: PropTypes.bool.isRequired,
  isPast: PropTypes.bool.isRequired,
  isFuture: PropTypes.bool.isRequired,
};

export default memo(Day);
