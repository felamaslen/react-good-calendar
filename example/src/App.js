import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-good-calendar';
import styled from 'styled-components';

const theme = {
  // weekHeight: 128,
  // borderColor: rgb(220, 220, 220),
  // hoverColor: rgb(245, 245, 245),
  // activeColor: 'none',
  // inactiveColor: rgb(238, 238, 238),
  // todayColor: rgb(238, 238, 255),
  // eventFontSize: 14,
  // eventMargin: 2,
  // eventPadding: 4,
};

function MyToolbar({ children }) {
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
  const [color, setColor] = useState(colors[0]);

  const timer = useRef();
  useEffect(() => {
    timer.current = setTimeout(() => {
      setColor((last) => colors[(colors.indexOf(last) + 1) % colors.length]);
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [color]);

  return (
    <div style={{ color }}>
      {children}
    </div>
  );
}

MyToolbar.propTypes = {
  children: PropTypes.node.isRequired,
};

const components = {
  Toolbar: MyToolbar,
};

const events = [
  {
    id: 'event-1',
    startTime: new Date(Date.now() - 1000 * (86400 * 3 - 3600 * 2.5)),
    endTime: new Date(Date.now() + 1000 * 86400 * 1.5),
    title: 'Partay',
    color: '#fea031',
  },
  {
    id: 'event-2',
    startTime: new Date(),
    endTime: new Date(),
    title: 'Point in time (today)',
    color: 'darkgreen',
  },
  {
    id: 'event-3',
    startTime: new Date(Date.now() + 1000 * (86400 * 1.5)),
    endTime: new Date(Date.now() + 1000 * (86400 * 1.5)),
    title: 'In future',
    color: 'cyan',
  },
];

const ExampleContainer = styled.div`
  margin-bottom: 0.25rem;
  padding: 0.25rem 0;
  border: 1px solid hotpink;
`;

export default function App() {
  const [eventResult, setEventResult] = useState(null);

  const onNewEvent = useCallback((day) => {
    setEventResult({
      type: 'newEvent',
      day,
    });
  }, []);

  const onEditEvent = useCallback((event) => {
    setEventResult({
      type: 'editEvent',
      event,
    });
  }, []);

  return (
    <>
      <ExampleContainer>
        <Calendar
          theme={theme}
          components={components}
          events={events}
          onNewEvent={onNewEvent}
          onEditEvent={onEditEvent}
        />
      </ExampleContainer>
      <ExampleContainer>
        Event result:
        {JSON.stringify(eventResult)}
      </ExampleContainer>
    </>
  );
}
