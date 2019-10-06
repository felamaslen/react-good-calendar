import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';

import * as Styled from './styles';
import Day from './day';

export default function Week({
  week,
  today,
  firstDate,
  lastDate,
}) {
  const days = useMemo(() => (
    new Array(7).fill(0)
      .map((item, index) => addDays(week, index))
      .map((day) => ({ day, key: day.toISOString() }))
  ), [week]);

  return (
    <Styled.Week>
      {days.map(({ key, day }) => (
        <Day
          key={key}
          day={day}
          isToday={isSameDay(day, today)}
          isPast={day < firstDate}
          isFuture={day > lastDate}
        />
      ))}
    </Styled.Week>
  );
}

Week.propTypes = {
  week: PropTypes.instanceOf(Date).isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  firstDate: PropTypes.instanceOf(Date).isRequired,
  lastDate: PropTypes.instanceOf(Date).isRequired,
};
