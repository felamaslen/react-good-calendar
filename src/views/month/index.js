import React, { useContext, useMemo } from 'react';
import compose from 'just-compose';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import addWeeks from 'date-fns/addWeeks';

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

export default function ViewMonth() {
  const { date } = useContext(StateContext);

  const firstDate = useMemo(() => getFirstDate(date), [date]);
  const lastDate = useMemo(() => getLastDate(date), [date]);

  const numWeeks = useMemo(() => 1 + differenceInWeeks(lastDate, firstDate), [lastDate, firstDate]);

  const weeks = useMemo(() => (
    new Array(numWeeks).fill(0)
      .map((item, index) => addWeeks(firstDate, index))
      .map((week) => ({ week, key: week.toISOString() }))
  ), [firstDate, numWeeks]);

  return (
    <Styled.Main>
      {weeks.map(({ key, week }) => (
        <Week key={key} week={week} />
      ))}
    </Styled.Main>
  );
}
