import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { EventsContext } from '../../context';
import { eventInDay } from '../../modules/time';

import * as Styled from './styles';

export default function DayEvents({ day, allDay }) {
  const events = useContext(EventsContext);

  const dayEvents = useMemo(() => (
    events
      .map((event) => ({
        ...event,
        inDay: eventInDay(day, event.startTime, event.endTime),
      }))
      .filter(({ inDay }) => inDay)
  ), [day, events]);

  return (
    <>
      {dayEvents.map(({
        id,
        title,
        allDay: eventAllDay,
        color = 'white',
      }) => (
        <Styled.DayEvent
          key={id}
          allDay={Boolean(allDay || eventAllDay)}
          color={color}
        >
          {title}
        </Styled.DayEvent>
      ))}
    </>
  );
}

DayEvents.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  allDay: PropTypes.bool,
};

DayEvents.defaultProps = {
  allDay: false,
};
