import React, { useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { EventsContext } from '../../context';
import { eventInDay } from '../../modules/time';
import { eventShape } from '../../modules/types';

import * as Styled from './styles';

function DayEvent({
  allDay,
  inDay,
  event,
  onEditEvent,
}) {
  const onClick = useCallback((clickEvent) => {
    clickEvent.stopPropagation();
    onEditEvent(event);
  }, [event, onEditEvent]);

  return (
    <Styled.DayEvent
      allDay={Boolean(allDay || event.allDay)}
      inDay={inDay}
      color={event.color}
      onClick={onClick}
    >
      {event.title}
    </Styled.DayEvent>
  );
}

DayEvent.propTypes = {
  allDay: PropTypes.bool.isRequired,
  inDay: PropTypes.number.isRequired,
  event: eventShape.isRequired,
  onEditEvent: PropTypes.func.isRequired,
};

export default function DayEvents({ day, allDay, onEditEvent }) {
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
      {dayEvents.map(({ inDay, ...event }) => (
        <DayEvent
          key={event.id}
          allDay={allDay}
          inDay={inDay}
          event={event}
          onEditEvent={onEditEvent}
        />
      ))}
    </>
  );
}

DayEvents.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  allDay: PropTypes.bool,
  onEditEvent: PropTypes.func.isRequired,
};

DayEvents.defaultProps = {
  allDay: false,
};
