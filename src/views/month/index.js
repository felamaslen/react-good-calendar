import React, { memo, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import compose from 'just-compose';
import memoize from 'memoize-one';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import addWeeks from 'date-fns/addWeeks';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

import { StateContext } from '../../context';
import * as Styled from './styles';
import Week from './week';

const weekStartsOn = 0;

const withWeekStart = (fn) => (date) => fn(date, { weekStartsOn });

const getFirstDate = compose(
  startOfMonth,
  withWeekStart(startOfWeek),
);

const getLastDate = compose(
  endOfMonth,
  withWeekStart(endOfWeek),
);

const Weeks = memo(({
  today,
  firstDate,
  lastDate,
  viewFirstDate,
  viewLastDate,
}) => (
  <>
    {new Array(1 + differenceInWeeks(lastDate, firstDate)).fill(0)
      .map((item, index) => addWeeks(firstDate, index))
      .map((week) => ({ week, key: week.toISOString() }))
      .map(({ key, week }) => (
        <Week
          key={key}
          week={week}
          today={today}
          firstDate={viewFirstDate}
          lastDate={viewLastDate}
        />
      ))}
  </>
));

Weeks.propTypes = {
  today: PropTypes.instanceOf(Date).isRequired,
  firstDate: PropTypes.instanceOf(Date).isRequired,
  lastDate: PropTypes.instanceOf(Date).isRequired,
  viewFirstDate: PropTypes.instanceOf(Date).isRequired,
  viewLastDate: PropTypes.instanceOf(Date).isRequired,
};

const getToday = memoize(startOfDay, ([prev], [next]) => (
  startOfDay(prev).toISOString() === startOfDay(next).toISOString()
));

const ViewMonth = memo(() => {
  const { date, now } = useContext(StateContext);

  const firstDate = useMemo(() => getFirstDate(date), [date]);
  const lastDate = useMemo(() => getLastDate(date), [date]);

  const viewFirstDate = useMemo(() => startOfMonth(date), [date]);
  const viewLastDate = useMemo(() => endOfMonth(date), [date]);

  const today = getToday(now);

  return (
    <Styled.Main>
      <Styled.Header>
        {new Array(7).fill(0)
          .map((item, index) => format(addDays(firstDate, index), 'eee'))
          .map((day) => (
            <Styled.DayOfWeek key={day}>{day}</Styled.DayOfWeek>
          ))}
      </Styled.Header>
      <Weeks
        today={today}
        firstDate={firstDate}
        lastDate={lastDate}
        viewFirstDate={viewFirstDate}
        viewLastDate={viewLastDate}
      />
    </Styled.Main>
  );
});

export default ViewMonth;
