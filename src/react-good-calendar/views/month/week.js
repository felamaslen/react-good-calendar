import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import addDays from 'date-fns/addDays';

import * as Styled from './styles';
import Day from './day';

export default function Week({ week }) {
  const days = useMemo(() => (
    new Array(7).fill(0)
      .map((item, index) => addDays(week, index))
      .map(day => ({ day, key: day.toISOString() }))
  ), [week]);

  return (
    <Styled.Week>
      {days.map(({ key, day }) => (
        <Day key={key} day={day} />
      ))}
    </Styled.Week>
  );
}

Week.propTypes = {
  week: PropTypes.instanceOf(Date).isRequired,
};
