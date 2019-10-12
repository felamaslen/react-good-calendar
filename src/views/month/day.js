import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import getDate from 'date-fns/getDate';

import DayEvents from '../../components/day-events';
import * as Styled from './styles';

function Day({
  day,
  isToday,
  isPast,
  isFuture,
  onNewEvent,
  onEditEvent,
}) {
  const onClick = useCallback(() => onNewEvent(day), [day, onNewEvent]);

  return (
    <Styled.Day
      onClick={onClick}
    >
      <Styled.DayBackground
        isToday={isToday}
        isPast={isPast}
        isFuture={isFuture}
      />
      <Styled.DayTitle>{getDate(day)}</Styled.DayTitle>
      <DayEvents
        day={day}
        allDay
        onEditEvent={onEditEvent}
      />
    </Styled.Day>
  );
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  isToday: PropTypes.bool.isRequired,
  isPast: PropTypes.bool.isRequired,
  isFuture: PropTypes.bool.isRequired,
  onNewEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
};

export default memo(Day);
